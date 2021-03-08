from rest_framework import serializers
from ...control.models import Session
from ..application.serializers import ApplicationSerializer
from ..flight.serializers import FlightSerializer
from ..utils import get_split_timestamp, get_ua_details

class SessionSerializer(serializers.ModelSerializer):
    application = ApplicationSerializer(many=False, read_only=True)
    flight = FlightSerializer(many=False, read_only=True)
    split_timestamps = serializers.SerializerMethodField()
    agent_details = serializers.SerializerMethodField()

    def get_split_timestamps(self, obj):
        return {
            'start_timestamp': get_split_timestamp(obj.server_start_timestamp),
            'end_timestamp': get_split_timestamp(obj.server_end_timestamp)
        }
    
    def get_agent_details(self, obj):
        return get_ua_details(obj.ua_string)

    class Meta:
        model = Session
        exclude = ('ua_string',)