"""
Viewsets for API
"""
from rest_framework import generics
from rest_framework import permissions
from api.serializers import CampsiteSerializer, MarkerSerializer
from .models import Campsite

# TODO: geojson

class CampsiteList(generics.ListCreateAPIView):
    """
    API endpoint that allows all campsites to be viewed.
    """
    serializer_class = MarkerSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        """
        Optionally return campsites based off the url params (lat, lng, radius)
        """
        queryset = Campsite.objects.all()
        # TODO: filter by distance (https://www.movable-type.co.uk/scripts/latlong-db.html)
        lat = self.request.query_params.get('lat', None)
        lng = self.request.query_params.get('lng', None)
        radius = self.request.query_params.get('radius', None)
        print(lat, lng, radius)
        return queryset

    def perform_create(self, serializer):
        print(self.request.user)
        print(serializer)
        serializer.save(creator=self.request.user)

class CampsiteDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    API endpoint that returns a single campsite's details by id
    """
    serializer_class = CampsiteSerializer
    def get_queryset(self):
        print(self.kwargs)
        lookup = self.kwargs.get("pk")
        queryset = Campsite.objects.filter(id=lookup)
        return queryset
