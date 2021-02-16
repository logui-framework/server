from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status

from ...control.models import Flight
from .serializers import FlightSerializer


class FlightInfo(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, appID=None):
        if appID is None:
            return Response("", status=status.HTTP_400_BAD_REQUEST)
        
        flights = Flight.objects.filter(application=appID)
        many = True

        serializer = FlightSerializer(flights, many=many)
        return Response(serializer.data, status=status.HTTP_200_OK)