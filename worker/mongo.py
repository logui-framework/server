from pymongo import MongoClient
from django.conf import settings

def get_mongo_connection_handle():
    client = MongoClient(host=settings.MONGO_HOST,
                         port=int(settings.MONGO_PORT),
                         username=settings.MONGO_USERNAME,
                         password=settings.MONGO_PASSWORD)
    
    return client[settings.MONGO_DB]

def get_mongo_collection_handle(db_handle, collection_name):
    return db_handle[collection_name]

# Wed
#   view in api for a flight (to download)
#   include button in flight table to download
#   use <a ... download></a> to download the file?
#   while a download event is in progress, no other download should be possible.
