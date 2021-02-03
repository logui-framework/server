from django.contrib import admin
from . import models

class SessionAdminDisplay(admin.ModelAdmin):
    list_display = ('application', 'creation_date', 'ip_address')
    ordering = ('-creation_date', 'application')

admin.site.register(models.Application)
admin.site.register(models.Session, SessionAdminDisplay)