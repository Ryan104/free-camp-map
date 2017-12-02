from django.db import models

class Campsite(models.Model):
    """
    Model representing a campsite location
    """
    name = models.CharField(max_length=200)
    creator = models.ForeignKey('User', on_delete=models.SET_NULL, null=True)
      # campsite can have one creator, user may have created many campsites
    edited_by = models.ForeignKey('User', on_delete=models.SET_NULL, null=True, default=None)
    lat = models.FloatField()
    lng = models.FloatField()
    description = models.TextField(max_length=2000, help_text='Enter a description of the site')
    directions = models.TextField(max_length=2000, help_text='Give detailed directions to the site')
    created_at = models.DateField(auto_now_add=True, blank=True)
    updated_at = models.DateField(blank=True, null=True)
    pos_verify = models.IntegerField('Positive Verifications', default=0)
    neg_verify = models.IntegerField('Negative Verifications', default=0)
    # rating = models.FloatField(blank=True, null=True, default=None)
    

    def __str__(self):
        """
        String representing model object
        """
        return f"{self.name} ({self.lat},{self.lng})"

