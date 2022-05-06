from django.conf.urls import url 
from django.urls import path
from users import views 
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)

 

urlpatterns = [ 
    url('api/users', views.user_list),
    url('api/register', views.register),
    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair')

    #url(r'^api/tutorials/published$', views.tutorial_list_published)
    #path('',views.login),
    #path('api/login', views.login),
    #path('api/users', views.user_list),
]