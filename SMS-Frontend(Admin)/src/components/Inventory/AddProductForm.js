import React, { useState, useEffect } from 'react';
import '../Inventory/AddProductFormStyle.css';
import Swal from 'sweetalert2';

function AddProductForm ({ onAddProduct, productDetails, onUpdateProduct }) {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productQty, setProductQty] = useState('');
    const [productStatus, setProductStatus] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [productImage, setProductImage] = useState(null);

    // useEffect to update state when productDetails changes
    useEffect(() => {
        if (productDetails) {
            setProductName(productDetails.productName);
            setProductPrice(productDetails.productPrice);
            setProductQty(productDetails.productQty);
            setProductCategory(productDetails.productCategory);
            setExpirationDate(productDetails.expirationDate);
            setProductStatus(productDetails.productStatus);
            setProductImage(null); // Reset the image when editing a product
        } else {
            // Clear form fields when no product is selected for editing
            setProductName('');
            setProductPrice('');
            setProductQty('');
            setProductCategory('');
            setExpirationDate('');
            setProductImage(null); // Reset the image field
        }
    }, [productDetails]);

    // Add a new product
    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if any required field is empty
        if (!productName || !productPrice || !productQty || !productCategory) {
            // Display a warning message
            Swal.fire({
                icon: 'warning',
                title: 'Missing Fields',
                text: 'Please fill in all required fields.',
                showCloseButton: true
            });
            return; // Prevent form submission
        }

        // Create a new product object with the form values
        const newProduct = {
            productName,
            productPrice,
            productQty,
            productCategory,
            expirationDate,
            productImage
        };

        // Create FormData to handle file upload
        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('productPrice', productPrice);
        formData.append('productQty', productQty);
        formData.append('productCategory', productCategory);
        formData.append('expirationDate', expirationDate);
        formData.append('productImage', productImage);
        

        fetch('http://localhost:8080/addproduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${access_token}`,
            },
            body: formData,
        })
        // Check response
        .then(response => {
            if (!response.ok) {
                throw new Error('Network Response Was Not Okay');
            }
            return response.json();
        })
        .then(data => {
            console.log('Product saved successfully:', data);
            // Alert for successful product add
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
            setProductImage(null); // Reset the image field
        })
        .catch(error => {
            // Error Handling for add service
            console.error('Error saving product:', error);
            Swal.fire({
                icon: 'warning',
                title: 'Cannot save',
                text: error.message,
                showCloseButton: true
            });
        });
    };

    const handleCancel = () => {
        setProductName('');
        setProductCategory('');
        setProductPrice('');
        setProductQty('');
        setExpirationDate('');
        setProductImage(null); // Reset the image field
    };

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
            productImage,
            expirationDate,
        };

        // Create FormData to handle file upload
        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('productPrice', productPrice);
        formData.append('productQty', productQty);
        formData.append('productCategory', productCategory);
        formData.append('expirationDate', expirationDate);
        if (productImage) {
            formData.append('productImage', productImage);
        }

        // Send a PUT request to update the product with the provided ID
        fetch(`http://localhost:8080/updateproduct/${updatedProduct.productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${access_token}`,
            },
            body: formData,
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
            onUpdateProduct(data); // assuming 'data' contains the updated product

            // Reset form fields after update
            setProductName('');
            setProductCategory('');
            setProductPrice('');
            setProductQty('');
            setExpirationDate('');
            setProductImage(null); // Reset the image field
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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProductImage(file);
    };

    const user = localStorage.getItem("user");
    const { access_token } = JSON.parse(user);

    return (
        <div className='form-container'>
            <h3>Add New Product</h3>
            <form>
                <table className="form-table">
                    <tbody>
                        <tr>
                            <td>
                                <label>Product Name</label>
                            </td>
                            <td>
                                <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
                            </td>
                            <td>
                                <label>Product Price</label>
                            </td>
                            <td>
                                <input type="number" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
                            </td>
                            <td>
                                <label>Product Quantity</label>
                            </td>
                            <td>
                                <input type="number" value={productQty} onChange={(e) => setProductQty(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Product Category</label>
                            </td>
                            <td>
                                <input type="text" value={productCategory} onChange={(e) => setProductCategory(e.target.value)} />
                            </td>
                            <td>
                                <label>Expiration Date</label>
                            </td>
                            <td>
                                <input type="date" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} />
                            </td>
                            <td>
                                <label>Product Image</label>
                            </td>
                            <td>
                                <input type="file" accept="image/*" onChange={handleFileChange} className="product-img" />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="button-container">
                    <button type="submit" className="Addbtn" onClick={handleSubmit}>Add Product</button>
                    <button type="button" className="Cancelbtn" onClick={handleCancel}>Cancel</button>
                    <button type="button" className="Updatebtn" onClick={handleUpdate}>Update</button>
                </div>
            </form>
        </div>
    );
};

export default AddProductForm;
