from django.contrib import admin
from . import models

class FlightAdminDisplay(admin.ModelAdmin):
    list_display = ('name', 'application', 'fqdn')

class SessionAdminDisplay(admin.ModelAdmin):
    list_display = ('flight', 'start_timestamp', 'ip_address')
    ordering = ('-start_timestamp', 'flight')

admin.site.register(models.Application)
admin.site.register(models.Flight, FlightAdminDisplay)
admin.site.register(models.Session, SessionAdminDisplay)