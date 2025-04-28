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
        return Launch.objects.filter(is_upcoming=False).order_by('window_start').reverse()

class UpcomingLaunchViewSet(ReadOnlyModelViewSet):
    serializer_class = LaunchSerializer
    lookup_field = 'id'
    def get_queryset(self):
        return Launch.objects.filter(is_upcoming=True).order_by('window_start')


class AstronautViewSet(ReadOnlyModelViewSet):
    queryset = Astronaut.objects.all().order_by('date_of_birth')
    serializer_class = AstronautSerializer
    lookup_field = 'id'





