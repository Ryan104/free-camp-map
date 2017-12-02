"""
Define Serializers used for representing data in the REST API
"""
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Campsite

class UserSerializer(serializers.HyperlinkedModelSerializer):
    """
    Serializer for the User model
    """
    class Meta:
        model = User
        fields = ('username', 'is_authenticated')

class CampsiteSerializer(serializers.HyperlinkedModelSerializer):
    """
    Serializer for the Campsite (marker) data
    """
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
            'updated_at',
        )
