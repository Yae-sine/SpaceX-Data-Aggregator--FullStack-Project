import requests
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'NASA_SpaceX_Aggregator.settings')
django.setup()

from space_data.models import *
from datetime import datetime

def rockets_fetch_data():
    res=requests.get("https://api.spacexdata.com/v4/rockets")

    if res.status_code==200:
        output=res.json()
        for i in range(len(output)):
            myid = output[i].get("id")
            name = output[i].get("name", "")
            description = output[i].get("description", "")
            active = output[i].get("active", "unknown")
            boosters = output[i].get("boosters", 0)
            country = output[i].get("country", "")
            wikipedia = output[i].get("wikipedia", "")
            company = output[i].get("company", "")
            first_flight = datetime.strptime(output[i].get("first_flight", "1900-01-01"), '%Y-%m-%d').date()
            image_link = output[i].get("flickr_images", [None])[0]  # Default to None if no images are available
            Rockets.objects.update_or_create(
                    id=myid,
                    defaults={
                        'name': name,
                        'description': description,
                        'active': active,
                        'boosters': boosters,
                        'country': country,
                        'wikipediaLink': wikipedia,
                        'company': company,
                        'first_flight': first_flight,
                        'image_link': image_link
                    }
                )


def launch_fetch_data():
    res=requests.get("https://api.spacexdata.com/v5/launches")
    if res.status_code==200:
        output=res.json()
        for launch_data in output:
            myid = launch_data.get("id")
            name = launch_data.get("name", "")
            flight_number = launch_data.get("flight_number", 0)
            wikipedia_link = launch_data.get("links", {}).get("wikipedia", "")
            details = launch_data.get("details", "")
            image_link = launch_data.get("flickr", {}).get("original", "")[0]
            date_utc = datetime.strptime(launch_data.get("date_utc", "1970-01-01T00:00:00.000Z"),
                                         '%Y-%m-%dT%H:%M:%S.000Z')

            rocket_id = launch_data.get("rocket")
            try:
                 rocket = Rockets.objects.get(id=rocket_id)
            except Rockets.DoesNotExist:
                 rocket = None

            Launch.objects.update_or_create(
                id=myid,
                defaults={
                    'name': name,
                    'flight_number': flight_number,
                    'wikipedia_link': wikipedia_link,
                    'details': details,
                    'image_link': image_link,
                    'date_first_lunch': date_utc,
                    'rocket': rocket
                }
            )




def crews_fetch_data():
    res=requests.get("https://api.spacexdata.com/v4/crew")
    if res.status_code == 200:
        output=res.json()
        for i in range(len(output)):
            myid = output[i].get("id")
            name = output[i].get("name", "")
            agency=output[i].get("agency","")
            urlimage=output[i].get("image","")
            wikipediaLink=output[i].get("wikipedia","")
            status=output[i].get("status","")
            Crew.objects.update_or_create(
                    id=myid,
                    defaults={
                        'name':name,
                        'agency':agency,
                        'urlimage':urlimage,
                        'wikipediaLink':wikipediaLink,
                        'status':status
                    }
            )
            ### You still need the manytomany launches


##Add the Django command + the Windows Automation using Task Manager

