from django.urls import path, include
from .views import IndexView

app_name = 'users'

urlpatterns = [
    path('', IndexView.as_view(), name='index'),
]
