from django.views import View
from django.shortcuts import render
from django.utils.decorators import method_decorator
from .decorators import firstrun_prevention_check

class LandingView(View):
    @method_decorator(firstrun_prevention_check)
    def get(self, request):
        return render(request, 'logui/firstrun/landing.html', {})