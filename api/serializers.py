"""
Define Serializers used for representing data as JSON
"""
from django.contrib.auth.models import User
from rest_framework import serializers
from api.models import Campsite

class UserSerializer(serializers.HyperlinkedModelSerializer):
    """
    Serializer for the User model
    """
    class Meta:
        model = User
        fields = ('username', 'email', 'password')

class MarkerSerializer(serializers.HyperlinkedModelSerializer):
    """
    Serializer for Markers (basic campsit info)
    """
    class Meta:
        model = Campsite
        fields = ('id', 'name', 'lat', 'lng')

class CampsiteSerializer(serializers.ModelSerializer):
    """
    Serializer for detailed Campsite data
    """
    creator = serializers.ReadOnlyField(source='creator.username')
    created_at = serializers.ReadOnlyField()

    class Meta:
        model = Campsite
        fields = (
            'name',
            'creator',
            'lat',
            'lng',
            'description',
            'directions',
            'pos_verify',
            'neg_verify',
            'edited_by',
            'created_at',
            'updated_at'
            )
