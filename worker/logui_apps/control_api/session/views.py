from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status

from ...control.models import Flight, Session
from .serializers import SessionSerializer, SimpleSessionSerializer


class SessionListView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, flightID=None):
        many = True

        if flightID is None:
            return Response("", status=status.HTTP_400_BAD_REQUEST)
        
        try:
            flight = Flight.objects.get(id=flightID)
        except Flight.DoesNotExist:
            return Response("", status=status.HTTP_400_BAD_REQUEST)

        sessions = Session.objects.filter(flight=flightID)

        serializer = SimpleSessionSerializer(sessions, many=many)
        return Response(serializer.data, status=status.HTTP_200_OK)


class SessionInfoView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, sessionID=None):
        many = True

        if sessionID is None:
            return Response("", status=status.HTTP_400_BAD_REQUEST)
        
        try:
            session = Session.objects.get(id=sessionID)
        except Session.DoesNotExist:
            return Response("", status=status.HTTP_400_BAD_REQUEST)

        serializer = SessionSerializer(session, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)