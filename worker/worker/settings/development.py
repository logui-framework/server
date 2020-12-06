from .base import *

STATIC_DIR = BASE_DIR.parent / 'static'
CLIENT_APP_DIR = BASE_DIR.parent / 'app'

SECRET_KEY = 'developmentkey'
DEBUG = True
ALLOWED_HOSTS = ['localhost']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

STATICFILES_FINDERS = (
    'compressor.finders.CompressorFinder',
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
)

STATIC_ROOT = BASE_DIR / 'collectedstatic'
COMPRESS_ROOT = STATIC_ROOT

STATICFILES_DIRS = [
    STATIC_DIR,
    CLIENT_APP_DIR,
]