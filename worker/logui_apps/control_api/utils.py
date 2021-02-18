from .serializers import UserSerializer
from user_agents import parse

def token_response_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': UserSerializer(user, context={'request': request}).data,
    }

def get_split_timestamp(datetime_object):
    return_dict = {}

    if datetime_object is None:
        return None

    return_dict['date'] = {}
    return_dict['time'] = {}

    return_dict['date']['friendly'] = datetime_object.strftime('%d %B %Y')
    return_dict['date']['locale'] = datetime_object.strftime('%x')

    return_dict['time']['locale'] = datetime_object.strftime('%X')

    return return_dict

def get_ua_details(ua_string):
    ua_object = parse(ua_string)
    
    return_dict = {}

    return_dict['os'] = {}
    return_dict['os']['family'] = ua_object.os.family
    return_dict['os']['version'] = ua_object.os.version
    return_dict['os']['version_string'] = ua_object.os.version_string

    return_dict['browser'] = {}
    return_dict['browser']['family'] = ua_object.browser.family
    return_dict['browser']['version'] = ua_object.browser.version
    return_dict['browser']['version_string'] = ua_object.browser.version_string

    return_dict['is_desktop'] = ua_object.is_pc
    return_dict['is_touch_capable'] = ua_object.is_touch_capable

    return return_dict