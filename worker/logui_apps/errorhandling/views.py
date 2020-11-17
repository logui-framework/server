from django.views import View
from django.shortcuts import render

class Error404View(View):
    template_path = 'logui/errors/404.html'

    def get(self, request, *args, **kwargs):
        response = render(request, 'logui/errors/404.html')
        response.status_code = 404

        return response

class Error500View(View):
    template_path = 'logui/errors/500.html'

    def get(self, request, *args, **kwargs):
        response = render(request, 'logui/errors/500.html')
        response.status_code = 500

        return response