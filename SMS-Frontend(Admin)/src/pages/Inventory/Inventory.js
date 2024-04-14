import React, { useState,useEffect } from 'react'
import AddProductForm from '../../components/Inventory/AddProductForm'
import ProductList from '../../components/Inventory/ProductList'
import Swal from 'sweetalert2';

function Inventory() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]); // State variable to hold selected product

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await fetch("http://localhost:8080/getallproducts",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    fetchServices();
  }, []);

  const user = localStorage.getItem("user");
  const { access_token } = JSON.parse(user);

  const handleAddProduct = (newProduct) => {
    // Update products state with the newly added product
    setProducts([...products, newProduct]);
};

// Function to handle editing a product
const handleEditProduct = (productId) => {
  // Find the product with the given productId in the products array
  const productToEdit = products.find(product => product.productId === productId);
  // Set the selectedProduct state variable to the product to edit
  setSelectedProduct(productToEdit);
};

const handleDeleteProduct = async (productId) => {
  try {
    const response = await fetch(`http://localhost:8080/deleteproduct/${productId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // Remove the deleted product from the state
    setProducts(products.filter(product => product.productId !== productId));
  } catch (error) {
    console.error('Error deleting product:', error);
    // Handle error
    Swal.fire({
      icon:'warning',
      title:'Error',
      text:error,
      showCloseButton:true
    })
  }
};

  return (
    <div className='Container'>
      {/* Pass handleAddProduct as a prop to AddProductForm */}
      <div><AddProductForm onAddProduct={handleAddProduct} productDetails={selectedProduct} /></div>
      <div>
        <ProductList products={products} onDeleteProduct={handleDeleteProduct} onEdit={handleEditProduct}/>
      </div>
    </div>
  )
}

export default Inventory;