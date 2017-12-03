'''
Url patterns for the api app
From root /api/
'''
from django.conf.urls import url, include
# from rest_framework import routers
from rest_framework.authtoken import views as drf_views
from api import views

# router = routers.DefaultRouter()
# router.register(r'campsites', views.CampsiteList, 'campsite')

urlpatterns = [
    # get token with username=username&password=password
    url(r'^auth$', drf_views.obtain_auth_token, name='auth'),
    url(r'^campsites/$', views.CampsiteList.as_view(), name='campsites'),
    url(r'^campsites/(?P<pk>[0-9]+)/$', views.CampsiteDetail.as_view(), name='campsite-detail')
]
