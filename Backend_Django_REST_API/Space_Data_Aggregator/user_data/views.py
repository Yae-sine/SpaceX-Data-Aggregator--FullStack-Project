from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from .serializers import *


class SavedSpaceDevLaunchViewSet(ModelViewSet):
    serializer_class = SavedSpaceDevLaunchSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    http_method_names = ['post', 'get', 'delete']

    def get_queryset(self):
        return SavedSpaceDevLaunch.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
