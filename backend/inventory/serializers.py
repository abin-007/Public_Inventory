from rest_framework import serializers
from .models import Product, Variant, SubVariant, Stock

class SubVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubVariant
        fields = ['value']

class VariantSerializer(serializers.ModelSerializer):
    options = SubVariantSerializer(many=True, required=False)

    class Meta:
        model = Variant
        fields = ['name', 'options']

class ProductSerializer(serializers.ModelSerializer):
    variants = VariantSerializer(many=True, required=False)

    class Meta:
        model = Product
        fields = ['id', 'product_code', 'product_name', 'hsn_code', 'variants']

    def create(self, validated_data):
        variants_data = validated_data.pop('variants', [])
        product = Product.objects.create(**validated_data)
        for variant in variants_data:
            variant_obj = Variant.objects.create(product=product, name=variant['name'])
            for opt in variant.get('options', []):
                SubVariant.objects.create(variant=variant_obj, value=opt['value'])
        return product

class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = ['product', 'variant_name', 'quantity', 'is_addition']
