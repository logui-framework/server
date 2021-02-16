from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status

from ...control.models import Application, Flight
from .serializers import FlightSerializer


class FlightInfo(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, appID=None):
        many = True

        if appID is None:
            return Response("", status=status.HTTP_400_BAD_REQUEST)
        
        try:
            application = Application.objects.get(id=appID)
        except Application.DoesNotExist:
            return Response("", status=status.HTTP_400_BAD_REQUEST)

        flights = Flight.objects.filter(application=application)

        serializer = FlightSerializer(flights, many=many)
        return Response(serializer.data, status=status.HTTP_200_OK)

class SpecificFlightInfoView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    
    def get(self, request, flightID=None):
        if flightID is None:
            return Response("", status=status.HTTP_400_BAD_REQUEST)
        
        try:
            flight = Flight.objects.get(id=flightID)
        except Flight.DoesNotExist:
            return Response("", status=status.HTTP_400_BAD_REQUEST)
        
        serializer = FlightSerializer(flight, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)