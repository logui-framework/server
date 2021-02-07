from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status

from ...control.models import Application
from .serializers import ApplicationSerializer


class ApplicationInfo(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, appID=None):
        applications = Application.objects.all()
        many = True

        if appID is not None:
            applications = Application.objects.get(id=appID)
            many = False

        serializer = ApplicationSerializer(applications, many=many)
        return Response(serializer.data, status=status.HTTP_200_OK)