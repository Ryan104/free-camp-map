'''
Url patterns for the api app
From root /api/
'''
from django.conf.urls import url
from rest_framework.authtoken import views as drf_views

urlpatterns = [
    # get token with username=username&password=password
    url(r'^auth$', drf_views.obtain_auth_token, name='auth'),
]
