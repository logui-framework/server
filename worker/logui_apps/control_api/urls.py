from rest_framework_jwt.views import obtain_jwt_token
from django.urls import path

from .user import views as user_views
from .application import views as application_views
from .flight import views as flight_views
from .session import views as session_views

app_name = 'control_api'

urlpatterns = [
    path('user/auth/', obtain_jwt_token),
    path('user/current/', user_views.CurrentUser.as_view()),
    path('user/create/', user_views.CreateUserAccount.as_view()),  # This mapping is for when we wish to create new user accounts.

    path('application/list/', application_views.ApplicationInfoView.as_view()),
    path('application/specific/<uuid:appID>/', application_views.ApplicationInfoView.as_view()),
    path('application/add/check/', application_views.CheckApplicationNameView.as_view()),
    path('application/add/', application_views.AddApplicationView.as_view()),

    path('flight/list/<uuid:appID>/', flight_views.FlightInfo.as_view()),
    path('flight/info/<uuid:flightID>/', flight_views.SpecificFlightInfoView.as_view()),
    path('flight/info/<uuid:flightID>/status/', flight_views.FlightStatusView.as_view()),
    path('flight/info/<uuid:flightID>/token/', flight_views.FlightAuthorisationTokenView.as_view()),

    path('session/list/<uuid:flightID>/', session_views.SessionListView.as_view()),
    path('session/info/<uuid:sessionID>/', session_views.SessionInfoView.as_view()),
]