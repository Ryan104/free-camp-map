"""
Define Serializers used for representing data in the REST API
"""
from rest_framework import serializers
from .models import Campsite

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
        