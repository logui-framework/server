from django.urls import path
from . import views

app_name = 'control'

urlpatterns = [
    path('', views.LandingView.as_view(), name='landing')
]