from django.urls import path, include
from .views import payment_test, process, payment_canceled, payment_completed, stripe_webhook
from .views import get_current_price_info


app_name = 'payment'

urlpatterns = [
    path('process/', process , name='process'),
    path('payment_completed/', payment_completed , name='payment_completed'),
    path('payment_canceled/', payment_canceled , name='payment_canceled'),
    path('stripe/webhook/', stripe_webhook, name='stripe-webhook'),
    path('api/current-price/', get_current_price_info, name='current_price_info'),
    

]

