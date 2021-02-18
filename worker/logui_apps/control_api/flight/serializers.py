from rest_framework import serializers
from ..application.serializers import ApplicationSerializer
from ...control.models import Application, Flight, Session
from ..utils import get_split_timestamp

class FlightSerializer(serializers.ModelSerializer):
    sessions = serializers.SerializerMethodField(read_only=True)
    application = ApplicationSerializer(many=False, read_only=True)
    creation_timestamp_split = serializers.SerializerMethodField()

    def get_creation_timestamp_split(self, obj):
        return get_split_timestamp(obj.creation_timestamp)

    def get_sessions(self, flight_reference):
        return Session.objects.filter(flight=flight_reference).count()

    class Meta:
        model = Flight
        fields = '__all__'


class NewFlightSerializer(serializers.ModelSerializer):

    class Meta:
        model = Flight
        fields = ('name', 'fqdn', 'created_by', 'application')