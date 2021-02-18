from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status

from ...control.models import Application, Flight
from .serializers import FlightSerializer, NewFlightSerializer


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


class FlightAuthorisationTokenView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, flightID=None):
        if flightID is None:
            return Response("", status=status.HTTP_400_BAD_REQUEST)

        try:
            flight = Flight.objects.get(id=flightID)
        except Flight.DoesNotExist:
            return Response("", status=status.HTTP_400_BAD_REQUEST)
        
        response_dict = {
            'flightID': str(flight.id),
            'flightAuthorisationToken': 'Token goes here (from views.py)',
        }
        
        return Response(response_dict, status=status.HTTP_200_OK)


class FlightStatusView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get_flight_object(self, flightID):
        try:
            flight = Flight.objects.get(id=flightID)
            return flight
        except Flight.DoesNotExist:
            pass
        
        return False

    def get(self, request, flightID=None):
        flight = self.get_flight_object(flightID)

        if flight:
            return Response({'flightID': flightID, 'is_active': flight.is_active}, status=status.HTTP_200_OK)

        return Response({}, status=status.HTTP_404_NOT_FOUND)
    
    def patch(self, request, flightID=None):
        flight = self.get_flight_object(flightID)

        if flight:
            flight.is_active = not flight.is_active
            flight.save()

            return Response({'flightID': flightID, 'is_active': flight.is_active}, status=status.HTTP_200_OK)
        
        return Response({}, status=status.HTTP_404_NOT_FOUND)


class CheckFlightNameView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, appID):
        new_name = request.GET.get('flightName')
        response_dict = {
            'flightName': new_name,
            'is_available': True,
        }

        if new_name is None:
            return Response({}, status=status.HTTP_400_BAD_REQUEST)

        try:
            application = Application.objects.get(id=appID)
        except Application.DoesNotExist:
            return Response({}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            flight = Flight.objects.get(name__iexact=new_name, application=application)
            response_dict['is_available'] = False
        except Flight.DoesNotExist:
            pass
        
        return Response(response_dict, status=status.HTTP_200_OK)


class AddFlightView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, appID):
        if 'flightName' not in request.data or 'fqdn' not in request.data:
            return Response({}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            application = Application.objects.get(id=appID)
        except Application.DoesNotExist:
            return Response({}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            flight = Flight.objects.get(name__iexact=request.data['flightName'], application=application)
            return Response({}, status=status.HTTP_409_CONFLICT)
        except Flight.DoesNotExist:
            pass

        data = {}
        data['name'] = request.data['flightName']
        data['fqdn'] = request.data['fqdn']
        data['created_by'] = request.user.id
        data['application'] = application.id
        
        serializer = NewFlightSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response({}, status=status.HTTP_201_CREATED)

        return Response({}, status=status.HTTP_201_CREATED)