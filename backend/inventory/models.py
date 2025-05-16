from django.db import models
import uuid

class Product(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    product_code = models.CharField(max_length=100, unique=True)
    product_name = models.CharField(max_length=255)
    product_image = models.BinaryField(null=True, blank=True)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    is_favourite = models.BooleanField(default=False)
    active = models.BooleanField(default=True)
    hsn_code = models.CharField(max_length=100)
    total_stock = models.DecimalField(max_digits=10, decimal_places=2, default=0)

class Variant(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="variants")
    name = models.CharField(max_length=100)

class SubVariant(models.Model):
    variant = models.ForeignKey(Variant, on_delete=models.CASCADE, related_name="options")
    value = models.CharField(max_length=100)

class Stock(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    variant_name = models.CharField(max_length=100)  
    quantity = models.DecimalField(max_digits=10, decimal_places=2)
    is_addition = models.BooleanField(default=True)  
    date = models.DateTimeField(auto_now_add=True)

