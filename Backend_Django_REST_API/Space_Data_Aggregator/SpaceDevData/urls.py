from rest_framework import routers
from .views import *

router=routers.SimpleRouter()

router.register(r'agencies', AgencyViewSet),
router.register(r'upcomingLaunches', UpcomingLaunchViewSet,basename='upcoming-launches'),
router.register(r'pastLaunches', PastLaunchViewSet,basename='past-launches'),
router.register(r'astronauts', AstronautViewSet)

urlpatterns=router.urls