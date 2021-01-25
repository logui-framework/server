from logui_apps.errorhandling import views as error_views
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('logui_apps.control.urls')),
]

handler404 = error_views.handler_404_error
handler500 = error_views.handler_500_error