from django.conf.urls import url 
from recordings import views 
 
urlpatterns = [ 
    url('api/record$', views.record),
]