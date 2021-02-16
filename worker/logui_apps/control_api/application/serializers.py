from rest_framework import serializers

from ...control.models import Application, Flight


class ApplicationSerializer(serializers.ModelSerializer):
    flights = serializers.SerializerMethodField(read_only=True)

    def get_flights(self, application_reference):
        return Flight.objects.filter(application=application_reference).count()

    class Meta:
        model = Application
        fields = '__all__'