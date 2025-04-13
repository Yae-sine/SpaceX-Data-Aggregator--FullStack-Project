from rest_framework.viewsets import ReadOnlyModelViewSet
from .serializers import *
from .models import *

class AgencyViewSet(ReadOnlyModelViewSet):
    queryset = Agency.objects.all()
    serializer_class = AgencySerializer
    lookup_field = 'id'


class PastLaunchViewSet(ReadOnlyModelViewSet):
    serializer_class = LaunchSerializer
    lookup_field = 'id'
    def get_queryset(self):
        return Launch.objects.filter(is_upcoming=False)

class UpcomingLaunchViewSet(ReadOnlyModelViewSet):
    serializer_class = LaunchSerializer
    lookup_field = 'id'
    def get_queryset(self):
        return Launch.objects.filter(is_upcoming=True)


class AstronautViewSet(ReadOnlyModelViewSet):
    queryset = Astronaut.objects.all()
    serializer_class = AstronautSerializer
    lookup_field = 'id'


