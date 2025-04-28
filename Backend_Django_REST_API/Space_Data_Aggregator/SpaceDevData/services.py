import requests
from django.utils.timezone import make_aware
from datetime import datetime
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Space_Data_Aggregator.settings')
django.setup()


from SpaceDevData.models import *





def fetch_upcoming_and_previous_launches():
    try:
        # Fetch upcoming launches
        upcoming_res = requests.get("https://ll.thespacedevs.com/2.2.0/launch/upcoming")
        if upcoming_res.status_code == 200:
            process_launch_data(upcoming_res.json(), is_upcoming=True)

        # Fetch previous launches
        previous_res = requests.get("https://ll.thespacedevs.com/2.2.0/launch/previous")
        if previous_res.status_code == 200:
            process_launch_data(previous_res.json(), is_upcoming=False)
    except Exception as e:
        print(f"Error fetching launches: {e}")

def process_launch_data(data, is_upcoming):
    for launch_data in data.get("results", []):
        try:
            launch_id = launch_data.get("id")
            name = launch_data.get("name", "")
            status = launch_data.get("status", {}).get("name", "")
            window_start = make_aware(datetime.strptime(launch_data.get("window_start"), '%Y-%m-%dT%H:%M:%SZ'))
            window_end = make_aware(datetime.strptime(launch_data.get("window_end"), '%Y-%m-%dT%H:%M:%SZ'))
            mission_description = launch_data.get("mission", {}).get("description", "")
            mission_type = launch_data.get("mission", {}).get("type", "")
            rocket_name = launch_data.get("rocket", {}).get("configuration", {}).get("name", "")

            # Handle image_url
            image_url = launch_data.get("image", "")

            agency_data = launch_data.get("launch_service_provider", {})
            agency = None
            if agency_data:
                agency, _ = Agency.objects.get_or_create(
                    id=agency_data.get("id"),
                    defaults={"name": agency_data.get("name", ""), "type": agency_data.get("type", "")}
                )

            Launch.objects.update_or_create(
                id=launch_id,
                defaults={
                    "name": name,
                    "status": status,
                    "window_start": window_start,
                    "window_end": window_end,
                    "mission_description": mission_description,
                    "mission_type": mission_type,
                    "rocket_name": rocket_name,
                    "agency": agency,
                    "is_upcoming": is_upcoming,
                    "image_url": image_url,
                }
            )
        except Exception as e:
            print(f"Error processing launch data: {e}")

def fetch_agencies():
    try:
        res = requests.get("https://ll.thespacedevs.com/2.2.0/agencies/")
        if res.status_code == 200:
            for agency_data in res.json().get("results", []):
                try:
                    Agency.objects.update_or_create(
                        id=agency_data.get("id"),
                        defaults={
                            "name": agency_data.get("name", ""),
                            "type": agency_data.get("type", ""),
                            "founding_year": agency_data.get("founding_year", ""),
                            "description": agency_data.get("description", "")
                        }
                    )
                except Exception as e:
                    print(f"Error processing agency data: {e}")
    except Exception as e:
        print(f"Error fetching agencies: {e}")

def fetch_astronauts():
    try:
        res = requests.get("https://ll.thespacedevs.com/2.2.0/astronaut/")
        if res.status_code == 200:
            for astronaut_data in res.json().get("results", []):
                try:
                    agency_data = astronaut_data.get("agency", {})
                    agency = None
                    if agency_data:
                        agency, _ = Agency.objects.get_or_create(
                            id=agency_data.get("id"),
                            defaults={"name": agency_data.get("name", ""), "type": agency_data.get("type", "")}
                        )

                    Astronaut.objects.update_or_create(
                        id=astronaut_data.get("id"),
                        defaults={
                            "name": astronaut_data.get("name", ""),
                            "date_of_birth": astronaut_data.get("date_of_birth"),
                            "nationality": astronaut_data.get("nationality", ""),
                            "agency": agency,
                            "profile_image": astronaut_data.get("profile_image", ""),
                            "date_of_death": astronaut_data.get("date_of_death"),
                            "biography": astronaut_data.get("bio", ""),
                            "flights_count": astronaut_data.get("flights_count", 0),
                            "wiki_link":astronaut_data.get("wiki","")
                        }
                    )
                except Exception as e:
                    print(f"Error processing astronaut data: {e}")
    except Exception as e:
        print(f"Error fetching astronauts: {e}")


try:
    fetch_agencies()
    fetch_upcoming_and_previous_launches()
    fetch_astronauts()
except Exception as e:
    print(e)