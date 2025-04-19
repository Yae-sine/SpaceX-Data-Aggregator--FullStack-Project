from rest_framework import routers
from .views import *


router=routers.SimpleRouter()
router.register(r'save-spacex-launch',SavedSpaceXLaunchViewSet,basename='save-space-x-launch'),
router.register(r'save-space-dev-launch',SavedSpaceDevLaunchViewSet,basename='save-space-dev-launch')

urlpatterns=router.urls