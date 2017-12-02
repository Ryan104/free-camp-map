from django.db import models
from django.contrib.auth.models import User

class Campsite(models.Model):
    """
    Model representing a campsite location
    """
    name = models.CharField(max_length=200)
    creator = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='user_creator')
      # campsite can have one creator, user may have created many campsites
    edited_by = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True, default=None, related_name='user_editor')
    # favorited_by = models.ManyToManyField(User, related_name='users_favorited')
    lat = models.FloatField()
    lng = models.FloatField()
    description = models.TextField(max_length=2000, help_text='Enter a description of the site')
    directions = models.TextField(max_length=2000, help_text='Give detailed directions to the site')
    created_at = models.DateField(auto_now_add=True, blank=True)
    updated_at = models.DateField(blank=True, null=True, default=None)
    pos_verify = models.IntegerField('Positive Verifications', default=0)
    neg_verify = models.IntegerField('Negative Verifications', default=0)
    # rating = models.FloatField(blank=True, null=True, default=None)

    def __str__(self):
        """
        String representing model object
        """
        return f"{self.name} ({self.lat:.4f},{self.lng:.4f})"

class Profile(models.Model):
    """
    Model representing aditional user info - Most notably, their favorites list
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    favorite_sites = models.ManyToManyField(Campsite)
      # many users can favorite(save) many campsites

    def __str__(self):
        """
        String representign model object
        """
        return f"{self.user}"
