from rest_framework import serializers
from .models import *


class AgencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Agency
        fields = ['id', 'name', 'type', 'founding_year', 'description']


class LaunchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Launch
        fields = [
            'id', 'name', 'status', 'window_start', 'window_end', 'mission_description', 'mission_type', 'rocket_name', 'agency', 'is_upcoming', 'image_url',
            'pad_name', 'pad_latitude', 'pad_longitude', 'pad_location_name', 'pad_wiki_url', 'pad_map_url', 'pad_image_url',
            'mission_orbit', 'probability', 'weather_concerns', 'failreason', 'hashtag', 'webcast_live', 'infographic_url', 'program'
        ]


class AstronautSerializer(serializers.ModelSerializer):
    class Meta:
        model = Astronaut
        fields = ['id', 'name', 'date_of_birth', 'nationality', 'agency', 'profile_image', 'date_of_death', 'biography', 'flights_count','wiki_link']

