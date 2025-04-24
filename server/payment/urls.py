from django.urls import path, include
from .views import payment_test, process, payment_canceled, payment_completed, stripe_webhook

app_name = 'payment'

urlpatterns = [
    path('process/', process , name='process'),
    path('payment_completed/', payment_completed , name='payment_completed'),
    path('payment_canceled/', payment_canceled , name='payment_canceled'),
    path('stripe/webhook/', stripe_webhook, name='stripe-webhook'),
]

