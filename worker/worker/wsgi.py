"""
WSGI config for worker project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/howto/deployment/wsgi/
"""

import os
from django.core.wsgi import get_wsgi_application
from worker.settings import set_django_settings_module

set_django_settings_module()

logui_application = get_wsgi_application()
