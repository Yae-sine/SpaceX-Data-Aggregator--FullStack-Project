from django.db import models
from django.db.models import ForeignKey


class Rockets(models.Model):
    id=models.CharField(primary_key=True , max_length=50)
    name=models.CharField(max_length=30)
    description = models.TextField()
    active=models.CharField(max_length=15)
    boosters=models.IntegerField()
    country=models.CharField(max_length=20)
    wikipediaLink=models.URLField(max_length=100)
    company=models.CharField(max_length=20)
    first_flight=models.DateField()
    image_link=models.URLField(max_length=100)
    last_synced=models.DateField(auto_now=True)




class Launch(models.Model):
    id =models.CharField(primary_key=True,max_length=50)
    name =models.CharField(max_length=30)
    flight_number=models.IntegerField()
    wikipedia_link=models.URLField(max_length=100)
    details=models.TextField()
    image_link=models.URLField(max_length=100)
    date_first_lunch=models.DateTimeField()
    last_synced = models.DateField(auto_now=True)
    rocket=models.ForeignKey(Rockets, on_delete=models.CASCADE)


class Crew(models.Model):
    id=models.CharField(primary_key=True,max_length=50)
    name=models.CharField(max_length=20)
    agency_name=models.CharField(max_length=30)
    urlimage=models.URLField(max_length=100)
    wikipediaLink=models.URLField(max_length=100)
    status=models.CharField(max_length=20)
    last_synced = models.DateField(auto_now=True)
    launches=models.ManyToManyField(Launch)
