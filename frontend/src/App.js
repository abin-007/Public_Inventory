

import React from 'react';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import StockManager from './components/StockManager';

function App() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">🛒 Product Inventory System</h1>
      <ProductForm />
      <hr className="my-6" />
      <ProductList />
      <hr className="my-6" />
      <StockManager />
    </div>
  );
}

export default App;
