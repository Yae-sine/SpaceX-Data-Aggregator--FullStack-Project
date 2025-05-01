from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-authentication/', include('authentication.urls')),
    #path('api-auth/', include('rest_framework.urls')),
    path('api-spacex/',include('Space_X_Data.urls')),
    path('api-space-dev/',include('SpaceDevData.urls')),
    path('api-favorite-launch/',include('user_data.urls'))
]
