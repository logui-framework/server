from .base import *

STATIC_DIR = '/logui/static'
COPIED_STATIC_DIR = BASE_DIR / 'copied-static'
CLIENT_APP_DIR = BASE_DIR / 'app'

SECRET_KEY = os.getenv('SECRET_KEY')
DEBUG = False if os.getenv('DEBUG') == 'False' else True
ALLOWED_HOSTS = [os.getenv('DOCKER_HOSTNAME')]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'logui',
        'USER': 'postgres',
        'PASSWORD': os.getenv('DATABASE_PASSWORD'),
        'HOST': 'db',
        'PORT': '5432',
    }
}

STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
    'compressor.finders.CompressorFinder',
)

STATIC_ROOT = STATIC_DIR
COMPRESS_ROOT = STATIC_DIR

STATICFILES_DIRS = [
    COPIED_STATIC_DIR,
    CLIENT_APP_DIR,
]

MONGO_HOST = 'mongo'
MONGO_PORT = 27017
MONGO_DB = 'logui-db'
MONGO_USERNAME = 'mongo'
MONGO_PASSWORD = os.getenv('DATABASE_PASSWORD')