from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Product, Stock
from .serializers import ProductSerializer, StockSerializer



def home_view(request):
    return HttpResponse("Welcome to the Inventory System API!")

class CreateProduct(APIView):
    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Product created"}, status=201)
        return Response(serializer.errors, status=400)

class ListProducts(APIView):
    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

class AddStock(APIView):
    def post(self, request):
        serializer = StockSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            # Update total stock
            product = serializer.validated_data['product']
            qty = serializer.validated_data['quantity']
            if serializer.validated_data['is_addition']:
                product.total_stock += qty
            else:
                product.total_stock -= qty
            product.save()
            return Response({"message": "Stock updated"}, status=200)
        return Response(serializer.errors, status=400)

