from rest_framework import routers
from .views import *


router=routers.SimpleRouter()
router.register(r'save-space-dev-launch',SavedSpaceDevLaunchViewSet,basename='save-space-dev-launch')

urlpatterns=router.urls