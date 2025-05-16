import React, { useState, useEffect } from 'react';

const StockManager = () => {
  const [products, setProducts] = useState([]);
  const [productUUID, setProductUUID] = useState('');
  const [variantName, setVariantName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [isAddition, setIsAddition] = useState(true);

  // Fetch products to get UUIDs and display in dropdown
  useEffect(() => {
    fetch('/api/products/list/')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error loading products:', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productUUID || !variantName) {
      alert('Please select a product and enter variant name');
      return;
    }

    const payload = {
      product: productUUID,   // Send UUID here
      variant_name: variantName,
      quantity: parseFloat(quantity),
      is_addition: isAddition,
    };

    try {
      const res = await fetch('/api/products/stock/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(JSON.stringify(errorData));
      }

      alert('Stock updated successfully!');
      setVariantName('');
      setQuantity('');
      setIsAddition(true);
    } catch (error) {
      console.error('Error updating stock:', error);
      alert('Failed to update stock');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <label className="block mb-2">Select Product:</label>
      <select
        value={productUUID}
        onChange={(e) => setProductUUID(e.target.value)}
        className="border p-2 w-full mb-4"
        required
      >
        <option value="">-- Select a Product --</option>
        {products.map((product) => (
          <option key={product.id} value={product.id}>
            {product.product_name}
          </option>
        ))}
      </select>

      <label className="block mb-2">Variant Name:</label>
      <input
        type="text"
        value={variantName}
        onChange={(e) => setVariantName(e.target.value)}
        className="border p-2 w-full mb-4"
        placeholder="e.g., Color: Red"
        required
      />

      <label className="block mb-2">Quantity:</label>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className="border p-2 w-full mb-4"
        min="0"
        step="0.01"
        required
      />

      <label className="block mb-2">Is Addition?</label>
      <select
        value={isAddition}
        onChange={(e) => setIsAddition(e.target.value === 'true')}
        className="border p-2 w-full mb-4"
      >
        <option value="true">Add Stock</option>
        <option value="false">Remove Stock</option>
      </select>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Update Stock
      </button>
    </form>
  );
};

export default StockManager;
