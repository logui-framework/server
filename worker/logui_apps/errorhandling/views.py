from django.shortcuts import render

def handler_404_error(request, *args, **kwargs):
    response = render(request, 'logui/errors/404.html')
    response.status_code = 404

    return response

def handler_500_error(request, *args, **argv):
    response = render(request, 'logui/errors/500.html')
    response.status_code = 500

    return response