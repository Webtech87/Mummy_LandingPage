from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView

urlpatterns = [
    path("i18n/", include("django.conf.urls.i18n")),
    path('admin/', admin.site.urls),
    path('', RedirectView.as_view(url='/api/v1/users/', permanent=False)),
    path('api/v1/users/', include('users.urls')),
    path('api/v1/payment/', include('payment.urls')),
]
