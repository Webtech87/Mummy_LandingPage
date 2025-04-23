from django.utils.translation import gettext_lazy as _
from django.shortcuts import render, HttpResponse, redirect
from django.http import JsonResponse
from django.urls import reverse
import stripe
from django.conf import settings
from django.core.mail import send_mail
from django.views.decorators.csrf import csrf_exempt
import datetime
from users.views import get_pacage_price




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
    items_to_pay = []

    success_url = request.build_absolute_uri(reverse('payment:payment_completed'))
    cancel_url = request.build_absolute_uri(reverse('payment:payment_canceled'))

    #teste real payment
    session_data = {
        'payment_method_types': ['card'],
        #'client_reference_id': '1',
        #'customer': customer.id,
        'line_items': [
            {
                'price_data': {
                    'currency': 'eur',
                    'product_data': {
                        'name': "Protocol Mummy's day care by SantiClinic",
                    },
                    'unit_amount': get_pacage_price()[0]*100,  # price in cents
                },
                'quantity': 1,
            },
        ],
        'mode': 'payment',
        'payment_intent_data': {
            'setup_future_usage': 'off_session'
        },
        'success_url': success_url,
        'cancel_url': cancel_url,
    }

    session = stripe.checkout.Session.create(**session_data)

    return redirect(session.url, code=303)


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
