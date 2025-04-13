from rest_framework.viewsets import ReadOnlyModelViewSet
from .serializers import *
from .models import *

class RocketViewSet(ReadOnlyModelViewSet):
    queryset = Rockets.objects.all()
    serializer_class = RocketSerializer
    lookup_field = 'id'


class LaunchViewSet(ReadOnlyModelViewSet):
    queryset = Launch.objects.all()
    serializer_class = LaunchSerializer
    lookup_field = 'id'


class CrewViewSet(ReadOnlyModelViewSet):
    queryset = Crew.objects.all()
    serializer_class = CrewSerializer
    lookup_field = 'id'