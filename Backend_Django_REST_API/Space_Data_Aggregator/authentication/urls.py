from django.urls import path
from authentication.views import *

urlpatterns=[
    path('login/', login_page, name='login_page'),
    path('register/', register_page, name='register'),
]
