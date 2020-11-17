import uuid
from django.db import models

class Application(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=256, unique=True)

    class Meta:
        verbose_name_plural = 'Applications'
    
    def __str__(self):
        return self.name

class Flight(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    application = models.ForeignKey(Application, on_delete=models.CASCADE)
    name = models.CharField(max_length=256, unique=True)
    fqdn = models.CharField(max_length=512)
    is_active = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'Application Flight'
        verbose_name_plural = 'Application Flights'

class Session(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    flight = models.ForeignKey(Flight, on_delete=models.RESTRICT)
    is_active = models.BooleanField(default=True)
    ip_address = models.GenericIPAddressField()
    user_agent = models.TextField()
    creation_date = models.DateTimeField()