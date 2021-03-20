from pymongo import MongoClient
from django.conf import settings

def get_mongo_connection_handle():
    client = MongoClient(host=settings.MONGO_HOST,
                         port=int(settings.MONGO_PORT),
                         username=settings.MONGO_USERNAME,
                         password=settings.MONGO_PASSWORD)
    
    return (client[settings.MONGO_DB], client)

def get_mongo_collection_handle(db_handle, collection_name):
    return db_handle[collection_name]