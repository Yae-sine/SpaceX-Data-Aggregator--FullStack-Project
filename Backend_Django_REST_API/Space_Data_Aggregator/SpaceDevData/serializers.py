from rest_framework import serializers
from .models import *

class LaunchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Launch
        fields = ['id', 'name', 'status', 'window_start', 'window_end', 'mission_description', 'mission_type', 'rocket_name', 'agency', 'is_upcoming']
