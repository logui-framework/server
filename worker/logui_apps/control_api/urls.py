from rest_framework_jwt.views import obtain_jwt_token
from django.urls import path

from .user import views as user_views
from .application import views as application_views

app_name = 'control_api'

urlpatterns = [
    path('user/auth/', obtain_jwt_token),
    path('user/current/', user_views.CurrentUser.as_view()),
    path('user/create/', user_views.CreateUserAccount.as_view()),  # This mapping is for when we wish to create new user accounts.

    path('application/info/', application_views.ApplicationInfo.as_view()),
    path('application/info/<uuid:appID>', application_views.ApplicationInfo.as_view()),
]