from rest_framework import routers
from Space_X_Data.views import *

router=routers.SimpleRouter()

router.register(r'rockets', RocketViewSet),
router.register(r'launches', LaunchViewSet),
router.register(r'crews', CrewViewSet)

urlpatterns=router.urls