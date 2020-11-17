from django.urls import path
from .consumers import endpoint
from .consumers import interface

websocket_urlpatterns = [
    path('ws/endpoint/', endpoint.EndpointConsumer.as_asgi()),
    path('ws/interface/', interface.InterfaceConsumer.as_asgi()),
]