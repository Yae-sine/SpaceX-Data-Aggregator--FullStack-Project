from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-authentication/', include('authentication.urls')),
    path('api-spacex/',include('Space_X_Data.urls')),
    path('api-space-dev/',include('SpaceDevData.urls')),
    path('api-favorite-launch/',include('user_data.urls')),
    path('api/accounts/', include('accounts.urls')),
    ]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

