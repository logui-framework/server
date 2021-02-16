from rest_framework import serializers

from ..application.serializers import ApplicationSerializer
from ...control.models import Application, Flight, Session


class FlightSerializer(serializers.ModelSerializer):
    sessions = serializers.SerializerMethodField(read_only=True)
    application = ApplicationSerializer(many=False, read_only=True)

    def get_sessions(self, flight_reference):
        return Session.objects.filter(flight=flight_reference).count()

    class Meta:
        model = Flight
        fields = '__all__'