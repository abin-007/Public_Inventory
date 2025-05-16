from django.contrib import admin
from django.urls import path, include
from inventory.views import home_view 

urlpatterns = [
    path('', home_view),
    path('admin/', admin.site.urls),
    path('api/', include('inventory.urls')),  # Connect app URLs under /api/
]
