from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status

from ...control.models import Application
from .serializers import ApplicationSerializer, NewApplicationSerializer


class ApplicationInfoView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, appID=None):
        applications = Application.objects.all()
        many = True

        try:
            if appID is not None:
                applications = Application.objects.get(id=appID)
                many = False
        except Application.DoesNotExist:
            return Response("", status=status.HTTP_400_BAD_REQUEST)

        serializer = ApplicationSerializer(applications, many=many)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CheckApplicationNameView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        new_name = request.GET.get('name')
        response_dict = {
            'name': new_name,
            'is_available': True,
        }

        try:
            application = Application.objects.get(name__iexact=new_name)
            response_dict['is_available'] = False
        except Application.DoesNotExist:
            pass

        return Response(response_dict, status=status.HTTP_200_OK)


class AddApplicationView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        if 'name' not in request.data:
            return Response({}, status=status.HTTP_400_BAD_REQUEST)

        data = {}
        data['name'] = request.data['name']
        data['created_by'] = request.user.id

        if (data['name'] == ''):
            return Response({}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            application = Application.objects.get(name__iexact=data['name'])
            return Response({}, status=status.HTTP_409_CONFLICT)
        except Application.DoesNotExist:
            pass

        serializer = NewApplicationSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response({}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)