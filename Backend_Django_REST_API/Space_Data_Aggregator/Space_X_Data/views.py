from rest_framework import generics
from .models import Rockets,Launch,Crew
from .serializers import RocketSerializer



class RocketList(generics.ListCreateAPIView):
    queryset = Rockets.objects.all()
    serializer_class = RocketSerializer





