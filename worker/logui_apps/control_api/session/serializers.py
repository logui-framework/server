from rest_framework import serializers
from ...control.models import Session
from ..application.serializers import ApplicationSerializer
from ..flight.serializers import FlightSerializer

class SessionSerializer(serializers.ModelSerializer):
    application = ApplicationSerializer(many=False, read_only=True)
    flight = FlightSerializer(many=False, read_only=True)

    class Meta:
        model = Session
        fields = '__all__'

class SimpleSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = '__all__'