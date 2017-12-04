"""
Viewsets for API
"""
from rest_framework import generics
from api.serializers import CampsiteSerializer, MarkerSerializer, UserSerializer
from .models import Campsite

# TODO: geojson

# class UserViewSet(viewsets.ModelViewSet):
#     """
#     API endpoint that allows users to be viewed or edited.
#     """
#     queryset = User.objects.all().order_by('username')
#     serializer_class = UserSerializer

class UserSignup(generics.CreateAPIView):
    """
    API endpoint for creating new user
    """
    serializer_class = UserSerializer

    # def perform_create(self, serializer):
    #     queryset = SignupRequest.objects.filter(user=self.request.user)
    #     if queryset.exists():
    #         raise ValidationError('You have already signed up')
    #     serializer.save(user=self.request.user)

class CampsiteList(generics.ListAPIView):
    """
    API endpoint that allows all campsites to be viewed.
    """
    serializer_class = MarkerSerializer

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
