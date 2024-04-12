import React, { useState,useEffect } from 'react'
import AddProductForm from '../../components/Inventory/AddProductForm'
import ProductList from '../../components/Inventory/ProductList'
import axios from 'axios';

function Inventory() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
      fetchProducts();
  }, []);

  const fetchProducts = async () => {
      try {
          const response = await axios.get('http://localhost:8080/getallproducts');
          setProducts(response.data);
      } catch (error) {
          console.error('Error fetching products:', error);
      }
  };

  const handleEdit = (product) => {
    // Implement edit functionality
    console.log('Editing product:', product);
  };

  const handleDelete = (productId) => {
    // Implement delete functionality
    console.log('Deleting product with ID:', productId);
    // Update products state after deletion
    setProducts(products.filter(product => product.productId !== productId));
  };

  const handleAddProduct = (newProduct) => {
    // Update products state with the newly added product
    setProducts([...products, newProduct]);
};

  return (
    <div className='Container'>
      {/* Pass handleAddProduct as a prop to AddProductForm */}
      <div><AddProductForm onAddProduct={handleAddProduct}/></div>
      <div>
        <ProductList products={products} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  )
}

export default Inventory;