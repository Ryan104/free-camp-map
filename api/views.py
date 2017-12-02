"""
Viewsets for API
"""
from rest_framework import generics
from api.serializers import CampsiteSerializer
from .models import Campsite

''' TODO: geojson
GEOJSON:
{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [125.6, 10.1]
  },
  "properties": {
    "name": "Dinagat Islands"
  }
}
'''

# # Create your views here.
# class UserViewSet(viewsets.ModelViewSet):
#     """
#     API endpoint that allows users to be viewed or edited.
#     """
#     queryset = User.objects.all().order_by('username')
#     serializer_class = UserSerializer

class CampsiteList(generics.ListAPIView):
    """
    API endpoint that allows campsites to be viewed.
    """
    serializer_class = CampsiteSerializer

    def get_queryset(self):
        """
        Optionally return campsites based off the url params
        lat, lng, radius
        """
        queryset = Campsite.objects.all()
        # TODO: filter by distance (https://www.movable-type.co.uk/scripts/latlong-db.html)
        lat = self.request.query_params.get('lat', None)
        lng = self.request.query_params.get('lng', None)
        radius = self.request.query_params.get('radius', None)
        print(lat, lng, radius)
        return queryset
