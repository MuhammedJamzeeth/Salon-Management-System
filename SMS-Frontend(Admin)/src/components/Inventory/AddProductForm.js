import React, { useState,useEffect } from 'react';
import '../Inventory/AddProductFormStyle.css';
import Swal from 'sweetalert2';

function AddProductForm ({ onAddProduct, productDetails, onUpdateProduct }) {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productQty, setProductQty] = useState('');
    const [productStatus, setProductStatus] = useState('')
    const [productCategory, setProductCategory] = useState('');
    const [expirationDate, setExpirationDate] = useState('');

    // useEffect to update state when productDetails changes
    useEffect(() => {
        if (productDetails) {
            setProductName(productDetails.productName);
            setProductPrice(productDetails.productPrice);
            setProductQty(productDetails.productQty);
            setProductCategory(productDetails.productCategory);
            setExpirationDate(productDetails.expirationDate);
            setProductStatus(productDetails.productStatus);
        }else {
            // Clear form fields when no product is selected for editing
            setProductName('');
            setProductPrice('');
            setProductQty('');
            setProductCategory('');
            setExpirationDate('');
        }
        
    }, [productDetails]);

    //Add a new product
    const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new product object with the form values
    const newProduct = {
    productName,
    productPrice,
    productQty,
    productCategory,
    expirationDate
    };

    fetch('http://localhost:8080/addproduct', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify(newProduct),
    })  
    //Check response
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Product saved successfully:', data);
        //alert for successfull product add
        Swal.fire({
            icon: 'success',
            title: 'Saved',
            text: 'Product Added Successfully...',
            showCloseButton: true
        });
        // Call the callback function to update products list
        onAddProduct(data); // assuming 'data' contains the newly added product
        // Reset form fields to empty values after submitting
        setProductName('');
        setProductCategory('');
        setProductPrice('');
        setProductQty('');
        setExpirationDate('');
    })
    .catch(error => {
        //Error Handling for add service
        console.error('Error saving product:', error);
        Swal.fire({
            icon: 'warning',
            title: 'cannot save',
            text: error,
            showCloseButton: true
        })
    });
};

const handleCancel = ()=> {
    setProductName('');
    setProductCategory('');
    setProductPrice('');
    setProductQty('');
    setExpirationDate('');
}

// Function to handle product update
const handleUpdate = () => {
    if (!productDetails) return; // Don't update if no product selected

    const updatedProduct = {
        productId: productDetails.productId, // Get ID from selected product
        productName,
        productPrice,
        productQty,
        productStatus,
        productCategory,
        expirationDate,
    };

    // Send a PUT request to update the product with the provided ID
    fetch(`http://localhost:8080/updateproduct/${updatedProduct.productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify(updatedProduct),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Product updated successfully:', data);
        Swal.fire({
            icon: 'success',
            title: 'Updated',
            text: 'Product Updated Successfully...',
            showCloseButton: true
        });

        
        // Call the callback function to update products list
        onUpdateProduct(data); // assuming 'data' contains the newly added product

        // Reset form fields after update
        setProductName('');
        setProductCategory('');
        setProductPrice('');
        setProductQty('');
        setExpirationDate('');

    })
    .catch(error => {
        console.error('Error updating product:', error);
        // Handle error
        Swal.fire({
            icon: 'warning',
            title: 'Click Edit',
            text: 'No Product selected for updating',
            showCloseButton: true
        });
    });
};

const user = localStorage.getItem("user");
const { access_token } = JSON.parse(user);

    return (
        <div className='form-container'>
            <h3>Add New Product</h3>
            <form>
                <div className='form-container-1'>
                    <label>Product Name </label>
                    <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required />

                    <label>Product Price</label>
                    <input type="number" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} required />

                    <label>Product Quantity </label>
                    <input type="number" value={productQty} onChange={(e) => setProductQty(e.target.value)} required />
                </div>
                <div className='form-container-2'>
                    <label>Product Category </label>
                    <input type="text" value={productCategory} onChange={(e) => setProductCategory(e.target.value)} required />

                    <label>Expiration Date </label>
                    <input type="date" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} />
                </div>
                <div className='button-container'>
                    <button type="submit" className='Addbtn' onClick={handleSubmit}>Add Product</button>
                    <button type="button" className='Cancelbtn' onClick={handleCancel}>Cancel</button>
                    <button type="button" className='Updatebtn' onClick={handleUpdate}>Update</button>
                </div>
            </form>
        </div>
    );
};

export default AddProductForm;

