from rest_framework import serializers

from ...control.models import Application, Flight


class ApplicationSerializer(serializers.ModelSerializer):
    flights = serializers.SerializerMethodField(read_only=True)

    def get_flights(self, application_reference):
        return Flight.objects.filter(application=application_reference).count()

    class Meta:
        model = Application
        fields = '__all__'


    # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    # created_by = models.ForeignKey(User, on_delete=models.RESTRICT)
    # name = models.CharField(max_length=256, unique=True)
    # is_active = models.BooleanField(default=True)
    # creation_timestamp = models.DateTimeField()

class NewApplicationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Application
        fields = ('name', 'created_by')