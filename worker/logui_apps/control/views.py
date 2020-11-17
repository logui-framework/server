from django.views import View
from django.shortcuts import render
from django.utils.decorators import method_decorator
from logui_apps.firstrun.decorators import firstrun_check

class LandingView(View):
    @method_decorator(firstrun_check)
    def get(self, request):
        return render(request, 'logui/control/landing.html', {})