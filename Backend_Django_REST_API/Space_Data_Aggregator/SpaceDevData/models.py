from django.db import models


class Agency(models.Model):
    id = models.IntegerField(primary_key=True)  # Matches SpaceDevs ID
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=100, blank=True)
    founding_year = models.CharField(max_length=4, blank=True, null=True)
    description = models.TextField(blank=True, null=True)




class Astronaut(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255)
    date_of_birth = models.DateField(null=True, blank=True)
    nationality = models.CharField(max_length=100, blank=True)
    agency = models.ForeignKey(Agency, on_delete=models.SET_NULL, null=True)
    profile_image = models.URLField(blank=True, null=True)
    wiki_link=models.URLField(blank=True,null=True)
    date_of_death = models.DateField(null=True, blank=True)
    biography = models.TextField(blank=True, null=True)
    flights_count = models.IntegerField(null=True, blank=True)




class Launch(models.Model):
    id = models.CharField(primary_key=True, max_length=100)
    name = models.CharField(max_length=255)
    status = models.CharField(max_length=100)
    window_start = models.DateTimeField()
    window_end = models.DateTimeField()
    agency = models.ForeignKey(Agency, on_delete=models.SET_NULL, null=True, blank=True)
    mission_description = models.TextField(blank=True, null=True)
    is_upcoming = models.BooleanField(default=True)
    mission_type = models.CharField(max_length=100, blank=True, null=True)
    rocket_name = models.CharField(max_length=255, blank=True, null=True)
    image_url = models.URLField(blank=True, null=True)
