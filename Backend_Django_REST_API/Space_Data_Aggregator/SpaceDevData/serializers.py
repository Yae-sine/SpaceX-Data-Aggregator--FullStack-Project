from rest_framework import serializers
from .models import *


class AgencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Agency
        fields = ['id', 'name', 'type', 'founding_year', 'description']


class LaunchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Launch
        fields = ['id', 'name', 'status', 'window_start', 'window_end', 'mission_description', 'mission_type', 'rocket_name', 'agency', 'is_upcoming','image_url']


class AstronautSerializer(serializers.ModelSerializer):
    class Meta:
        model = Astronaut
        fields = ['id', 'name', 'date_of_birth', 'nationality', 'agency', 'profile_image', 'date_of_death', 'biography', 'flights_count','wiki_link']

