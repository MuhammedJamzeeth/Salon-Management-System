import React, { useState } from 'react';
import '../Inventory/AddProductFormStyle.css';
import Swal from 'sweetalert2';

function AddProductForm ({ onAddProduct }) {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productQty, setProductQty] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [expirationDate, setExpirationDate] = useState('');

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

const user = localStorage.getItem("user");
const { access_token } = JSON.parse(user);

    return (
        <div className='form-container'>
            <h3>Add New Product</h3>
            <form onSubmit={handleSubmit}>
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
                    <button type="submit" className='Addbtn'>Add Product</button>
                    <button type="submit" className='Cancelbtn'>Cancel</button>
                    <button type="submit" className='Updatebtn'>Update</button>
                </div>
            </form>
        </div>
    );
};

export default AddProductForm;

