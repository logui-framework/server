import uuid
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User


class Application(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_by = models.ForeignKey(User, on_delete=models.RESTRICT)
    name = models.CharField(max_length=256, unique=True)
    is_active = models.BooleanField(default=True)
    creation_timestamp = models.DateTimeField(default=timezone.now)

    class Meta:
        verbose_name_plural = 'Applications'
    
    def __str__(self):
        return self.name


class Flight(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_by = models.ForeignKey(User, on_delete=models.RESTRICT)
    application = models.ForeignKey(Application, on_delete=models.CASCADE)
    name = models.CharField(max_length=256, unique=True)
    is_active = models.BooleanField(default=True)
    fqdn = models.URLField(max_length=1024)
    creation_timestamp = models.DateTimeField()

    class Meta:
        verbose_name_plural = 'Flights'

    def __str__(self):
        return f'{self.name} ({self.application.name})'


class Session(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    flight = models.ForeignKey(Flight, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
    ip_address = models.GenericIPAddressField()
    user_agent = models.TextField()
    browser = models.TextField()
    os = models.TextField()
    device = models.TextField()
    start_timestamp = models.DateTimeField()
    end_timestamp = models.DateTimeField()

    class Meta:
        verbose_name_plural = 'Sessions'
    
    def __str__(self):
        return f'{self.flight.application.name}, Flight {self.flight.name}, Session {self.id}'