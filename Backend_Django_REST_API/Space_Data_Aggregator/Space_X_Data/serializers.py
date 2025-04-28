from rest_framework import serializers
from .models import Rockets, Launch, Crew


class RocketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rockets
        fields = ['id','name','description','active','boosters','country','wikipediaLink','company','first_flight','image_link','last_synced']




class LaunchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Launch
        fields = ['id', 'name', 'flight_number', 'wikipedia_link', 'details', 'image_link', 'date_first_lunch','last_synced', 'rocket']



class CrewSerializer(serializers.ModelSerializer):
    class Meta:
        model=Crew
        fields = ['id', 'name', 'agency_name', 'urlimage', 'wikipediaLink', 'status', 'last_synced']