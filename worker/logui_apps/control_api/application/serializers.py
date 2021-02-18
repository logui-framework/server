from rest_framework import serializers
from ...control.models import Application, Flight
from ..utils import get_split_timestamp

class ApplicationSerializer(serializers.ModelSerializer):
    flights = serializers.SerializerMethodField(read_only=True)
    creation_timestamp_split = serializers.SerializerMethodField()

    def get_creation_timestamp_split(self, obj):
        return get_split_timestamp(obj.creation_timestamp)

    def get_flights(self, application_reference):
        return Flight.objects.filter(application=application_reference).count()

    class Meta:
        model = Application
        fields = '__all__'

class NewApplicationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Application
        fields = ('name', 'created_by')