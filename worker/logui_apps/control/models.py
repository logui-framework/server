import uuid
from django.db import models
from django.contrib.auth.models import User

class Application(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    responsible_user = models.ForeignKey(User, on_delete=models.RESTRICT)
    name = models.CharField(max_length=256, unique=True)
    flightname = models.CharField(max_length=256)
    fqdn = models.URLField(max_length=512)
    is_active = models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = 'Applications'
    
    def __str__(self):
        return self.name

class Session(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    application = models.ForeignKey(Application, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
    ip_address = models.GenericIPAddressField()
    user_agent = models.TextField()
    creation_date = models.DateTimeField()

    class Meta:
        verbose_name_plural = 'Sessions'
    
    def __str__(self):
        return f'{self.application.name}, Session {self.id}'