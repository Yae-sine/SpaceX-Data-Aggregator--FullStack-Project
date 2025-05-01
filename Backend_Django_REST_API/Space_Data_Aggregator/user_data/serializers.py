from rest_framework import serializers

from SpaceDevData.models import Launch
from .models import *


class SavedSpaceXLaunchSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    launch = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = SavedSpaceXLaunch
        fields = ['id', 'user', 'launch', 'saved_at']


class SavedSpaceDevLaunchSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    launch = serializers.PrimaryKeyRelatedField(
        queryset=Launch.objects.all()
    )

    class Meta:
        model = SavedSpaceDevLaunch
        fields = ['id','saved_at', 'user', 'launch']
