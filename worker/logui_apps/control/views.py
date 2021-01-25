from django.views import View
from django.shortcuts import render

class LandingView(View):
    def get(self, request):
        return render(request, 'logui/control/landing.html', {})