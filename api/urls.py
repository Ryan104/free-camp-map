'''
Url patterns for the api app
From root /api/
'''
from django.conf.urls import url, include
# from rest_framework import routers
from rest_framework.authtoken import views as drf_views
from api import views

urlpatterns = [
    url(r'^auth/', include('rest_auth.urls')),
    url(r'^auth/registration/', include('rest_auth.registration.urls')),
    url(r'^campsites/$', views.CampsiteList.as_view(), name='campsites'),
    url(r'^campsites/(?P<pk>[0-9]+)/$', views.CampsiteDetail.as_view(), name='campsite-detail')
]
