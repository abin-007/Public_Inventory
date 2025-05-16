import React, { useEffect, useState } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from backend API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products/list/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;

  if (products.length === 0) return <p>No products found.</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Product List</h2>
      <ul className="space-y-4">
        {products.map((product) => (
          <li key={product.id} className="border p-4 rounded shadow">
            <p><strong>Product Code:</strong> {product.product_code}</p>
            <p><strong>Name:</strong> {product.product_name}</p>
            <p><strong>HSN Code:</strong> {product.hsn_code}</p>
            {/* Show total_stock if you want, but it's not in your serializer, add it if needed */}
            {/* <p><strong>Total Stock:</strong> {product.total_stock}</p> */}

            {/* Optional: Show variants and options */}
            {product.variants && product.variants.length > 0 && (
              <div>
                <strong>Variants:</strong>
                <ul className="ml-4 list-disc">
                  {product.variants.map((variant, idx) => (
                    <li key={idx}>
                      {variant.name} - Options: {variant.options.map(o => o.value).join(', ')}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
