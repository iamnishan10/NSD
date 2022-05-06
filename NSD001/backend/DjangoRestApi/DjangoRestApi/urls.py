# from django.conf.urls import url, include
from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url 




urlpatterns = [
    #path('', include('users.urls')),
    url('', include('users.urls')),
    #url(r'^', include('recordings.urls')),
    path('admin/', admin.site.urls),
    path('exams/', include('exams.urls')),
    path('questions/', include('questions.urls'))
]
