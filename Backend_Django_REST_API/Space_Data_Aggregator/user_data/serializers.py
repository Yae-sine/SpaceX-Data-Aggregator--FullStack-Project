from rest_framework import serializers
from .models import *


class SavedSpaceXLaunchSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    launch = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = SavedSpaceXLaunch
        fields = ['id', 'user', 'launch', 'saved_at']


class SavedSpaceDevLaunchSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    launch = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = SavedSpaceDevLaunch
        fields = ['id', 'user', 'launch', 'saved_at']
