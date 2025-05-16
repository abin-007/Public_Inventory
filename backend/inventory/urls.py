
from django.urls import path
from .views import CreateProduct, ListProducts, AddStock
from . import views

urlpatterns = [ 
    path('', views.home_view),
    
    path('products/create/', CreateProduct.as_view()),
    path('products/list/', ListProducts.as_view()),
    path('products/stock/', AddStock.as_view()),

]
