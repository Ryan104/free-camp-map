"""
Define Serializers used for representing data as JSON
"""
# from django.contrib.auth.models import User
from rest_framework import serializers
from api.models import Campsite

# class UserSerializer(serializers.HyperlinkedModelSerializer):
#     """
#     Serializer for the User model
#     """
#     class Meta:
#         model = User
#         fields = ('username', 'is_authenticated')

class CampsiteSerializer(serializers.HyperlinkedModelSerializer):
    """
    Serializer for the Campsite (marker) data
    """
    # id = serializers.IntegerField(read_only=True)
    # name = serializers.CharField(max_length=200)
    # creator = 
    creator = serializers.ReadOnlyField(source='creator.username')
    created_at = serializers.ReadOnlyField()

    class Meta:
        model = Campsite
        # fields = ('name', 'creator', 'created_at')
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
