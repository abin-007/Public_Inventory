import React, { useState } from 'react';

const ProductForm = () => {
  const [productCode, setProductCode] = useState('');
  const [productName, setProductName] = useState('');
  const [hsnCode, setHsnCode] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      product_code: productCode,
      product_name: productName,
      hsn_code: hsnCode,
      // variants omitted for now
    };

    try {
      const response = await fetch('/api/products/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setMessage('Product created successfully!');
      setProductCode('');
      setProductName('');
      setHsnCode('');
    } catch (error) {
      console.error('Error creating product:', error);
      setMessage('Failed to create product');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 max-w-md mx-auto p-4 border rounded">
      <h2 className="text-xl font-semibold mb-4">Create Product</h2>

      <label className="block mb-2 font-medium">Product Code:</label>
      <input
        type="text"
        value={productCode}
        onChange={(e) => setProductCode(e.target.value)}
        className="border p-2 w-full mb-4"
        required
      />

      <label className="block mb-2 font-medium">Product Name:</label>
      <input
        type="text"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        className="border p-2 w-full mb-4"
        required
      />

      <label className="block mb-2 font-medium">HSN Code:</label>
      <input
        type="text"
        value={hsnCode}
        onChange={(e) => setHsnCode(e.target.value)}
        className="border p-2 w-full mb-4"
        required
      />

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Create Product
      </button>

      {message && <p className="mt-4">{message}</p>}
    </form>
  );
};

export default ProductForm;
