import os

def set_django_settings_module():
    if os.getenv('LOGUI_DEV'):
        os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'worker.settings.development')
    else:
        os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'worker.settings.docker')