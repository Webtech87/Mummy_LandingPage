from django.utils.translation import gettext_lazy as _
from django.shortcuts import render, HttpResponse, redirect
from django.http import JsonResponse
from django.urls import reverse
import stripe
from django.conf import settings
from django.core.mail import send_mail
from django.views.decorators.csrf import csrf_exempt
import datetime
from users.views import get_pacage_price, get_date_today


stripe.api_key = settings.STRIPE_SECRET_KEY


@csrf_exempt
def stripe_webhook(request):
    payload = request.body
    sig_header = request.headers.get("Stripe-Signature")

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_ENDPOINT_SECRET
        )
    except ValueError as e:
        print("Error ValueError:", str(e))
        return JsonResponse({"error":_("Invalid payload")}, status=400)
    except stripe.error.SignatureVerificationError as e:
        print("Error signature Stripe:", str(e))
        return JsonResponse({"error": _("Invalid signature")}, status=400)

    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]
        customer_details = session.get("customer_details")
        customer_email = customer_details.get("email")
        payment_intent_id = session.get("payment_intent")

        if payment_intent_id:
            charges = stripe.Charge.list(payment_intent=payment_intent_id).get("data", [])
            if charges:
                receipt_url = charges[0].get("receipt_url")
                if customer_email and receipt_url:
                    subject = _("Your Receipt from Our Site")
                    message = _(f"Thanks for using our site. You can get your receipt clicking on link: \n {receipt_url}")
                    send_mail(
                        subject,
                        message,
                        settings.EMAIL_HOST_USER,
                        [customer_email])
    else:
        print(f"New evente: {event['type']}")

    return JsonResponse({"status": "success"}, status=200)


def payment_test(request):
    return redirect('payment:process')


def process(request):
    try:
        # Get price information from users.views
        price_info = get_pacage_price()
        price_in_cents = price_info[0]  # Already in cents
        
        # Create a formatted display price (show as whole number)
        price_display = f"{price_in_cents / 100:.0f}€"
        
        # Determine the promotion type
        promo_type = price_info[2] if len(price_info) > 2 else "regular"
        
        success_url = request.build_absolute_uri(reverse('payment:payment_completed'))
        cancel_url = request.build_absolute_uri(reverse('payment:payment_canceled'))

        # Create a descriptive product name based on the promotion
        if promo_type == "early_promo":
            product_name = "Mummy Day Care - Oferta Especial (até 5 de maio)"
        elif promo_type == "late_promo":
            product_name = "Mummy Day Care - Promoção (até 12 de maio)"
        else:
            product_name = "Mummy Day Care - Preço Regular"

        session_data = {
            'payment_method_types': ['card'],
            'line_items': [
                {
                    'price_data': {
                        'currency': 'eur',
                        'product_data': {
                            'name': product_name,
                            'description': f"Protocol Mummy's day care by SantiClinic - {price_display}",
                        },
                        'unit_amount': price_in_cents,  # Already in cents
                    },
                    'quantity': 1,
                },
            ],
            'mode': 'payment',
            'payment_intent_data': {
                'setup_future_usage': 'off_session',
                'metadata': {
                    'promotion_type': promo_type,
                    'price': price_display
                }
            },
            'success_url': success_url,
            'cancel_url': cancel_url,
        }

        session = stripe.checkout.Session.create(**session_data)
        return redirect(session.url, code=303)
    
    except Exception as e:
        print(f"Error processing payment: {str(e)}")
        return JsonResponse({
            'error': 'Payment processing error',
            'details': str(e)
        }, status=500)


def payment_completed(request):
    context = {
        'title': _('Payment completed!'),
        'success': True,
        'redirect_url': '/',
        'msg': _('Payment successfully processed!'),
        'contact_email': 'roberto.santiago@webtech87.pt',
    }
    return JsonResponse(context)


def payment_canceled(request):
    context = {
        'title': _('Payment Canceled'),
        'success': False,  # Changed to False since payment was canceled
        'redirect_url': '/',
        'msg': _('Payment has been canceled!'),
        'contact_email': 'roberto.santiago@webtech87.pt',
        'status': 'canceled'
    }

    return JsonResponse(context)


@csrf_exempt
def get_current_price_info(request):
    """API endpoint to get the current price information for the frontend"""
    try:
        price_info = get_pacage_price()
        price_in_cents = price_info[0]
        next_price = price_info[1] if len(price_info) > 1 and price_info[1] is not None else None
        promo_type = price_info[2] if len(price_info) > 2 else "regular"
        
        # Format prices for display as whole numbers
        price_display = f"{price_in_cents / 100:.0f}€"
        next_price_display = f"{next_price / 100:.0f}€" if next_price else None
        
        # Get deadline dates
        today = get_date_today()
        first_deadline = datetime.datetime(2025, 5, 5).date()  # May 5, 2025
        second_deadline = datetime.datetime(2025, 5, 12).date()  # May 12, 2025
        
        # Determine next deadline
        if today <= first_deadline:
            next_deadline = first_deadline
            days_remaining = (first_deadline - today).days
        elif today <= second_deadline:
            next_deadline = second_deadline
            days_remaining = (second_deadline - today).days
        else:
            next_deadline = None
            days_remaining = 0
        
        # Format deadline for display
        if next_deadline:
            next_deadline_display = next_deadline.strftime("%d/%m/%Y")
        else:
            next_deadline_display = None
        
        return JsonResponse({
            'current_price': price_display,
            'current_price_cents': price_in_cents,
            'next_price': next_price_display,
            'promo_type': promo_type,
            'next_deadline': next_deadline_display,
            'days_remaining': days_remaining,
            'is_first_phase': today <= first_deadline,
            'is_second_phase': today > first_deadline and today <= second_deadline,
            'is_regular_price': today > second_deadline
        })
    except Exception as e:
        print(f"Error getting price info: {str(e)}")
        return JsonResponse({
            'error': 'Price info error',
            'details': str(e)
        }, status=500)