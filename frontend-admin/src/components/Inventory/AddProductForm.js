import React, { useState, useEffect } from 'react';
import '../Inventory/AddProductFormStyle.css';
import Swal from 'sweetalert2';
import axios from 'axios';

function AddProductForm ({ onAddProduct, productDetails, onUpdateProduct}) {
    const [productInputs, setProductInputs] = useState({
        productName: '',
        productPrice: '',
        productQty: '',
        productStatus: '',
        productCategory: '',
        expirationDate: '',
        productImage: null
    });

    useEffect(() => {
        if (productDetails) {
            setProductInputs(productDetails);
        }
    }, [productDetails]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { productName, productPrice, productQty, productCategory,expirationDate,productImage } = productInputs;

        if (!productName || !productPrice || !productQty || !productCategory || !productImage || !expirationDate) {
            Swal.fire({
                icon: 'warning',
                title: 'Missing Fields',
                text: 'Please fill in all required fields.',
                showCloseButton: true
            });
            return;
        }

        try {
        const formData = new FormData();
        formData.append('productName', productInputs.productName);
        formData.append('productPrice', productInputs.productPrice);
        formData.append('productQty', productInputs.productQty);
        formData.append('productCategory', productInputs.productCategory);
        formData.append('expirationDate', productInputs.expirationDate);
        if (productInputs.productImage) {
            formData.append('productImage', productInputs.productImage);
        }

        
            const user = localStorage.getItem("user");
            const { access_token } = JSON.parse(user);

            const response = await axios.post('http://localhost:8080/addProducts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${access_token}`,
                }
            });

            console.log('Product saved successfully:', response.data);
            onAddProduct(response.data);
            Swal.fire({
                icon: 'success',
                title: 'Saved',
                text: 'Product Added Successfully...',
                showCloseButton: true
            });

            

            setProductInputs({
                productName: '',
                productPrice: '',
                productQty: '',
                productStatus: '',
                productCategory: '',
                expirationDate: '',
                productImage: null
            });
        } catch (error) {
            console.error('Error saving product:', error);
            Swal.fire({
                icon: 'error',
                title: 'Cannot save',
                text: error.message,
                showCloseButton: true
            });
        }
    };

    const handleCancel = () => {
        setProductInputs({
            productName: '',
            productPrice: '',
            productQty: '',
            productStatus: '',
            productCategory: '',
            expirationDate: '',
            productImage: null
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!productDetails) {
            Swal.fire({
                icon: 'warning',
                title: 'No Product Selected',
                text: 'Please select a product to update.',
                showCloseButton: true
            });
            return;
        }

        const updatedProduct = {
            productId: productDetails.productId,
            ...productInputs
        };

        const formData = new FormData();
        formData.append('productName', productInputs.productName);
        formData.append('productPrice', productInputs.productPrice);
        formData.append('productQty', productInputs.productQty);
        formData.append('productCategory', productInputs.productCategory);
        formData.append('expirationDate', productInputs.expirationDate);
        if (productInputs.productImage) {
            formData.append('productImage', productInputs.productImage);
        }

        console.log(formData);

        try {
            const user = localStorage.getItem("user");
            const { access_token } = JSON.parse(user);

            const response = await axios.put(`http://localhost:8080/updateproduct/${updatedProduct.productId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${access_token}`,
                }
            });
            

            console.log('Product updated successfully:', response.data);

            Swal.fire({
                icon: 'success',
                title: 'Updated',
                text: 'Product Updated Successfully...',
                showCloseButton: true
            });

            onUpdateProduct(response.data);

            setProductInputs({
                productName: '',
                productPrice: '',
                productQty: '',
                productStatus: '',
                productCategory: '',
                expirationDate: '',
                productImage: null
            });
        } catch (error) {
            console.error('Error updating product:', error);
            Swal.fire({
                icon: 'error',
                title: 'Cannot update',
                text: error.message,
                showCloseButton: true
            });
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProductInputs((prevState) => ({
            ...prevState,
            productImage: file
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductInputs((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

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
                                <input type="text" name="productName" value={productInputs.productName} onChange={handleInputChange} />
                            </td>
                            <td>
                                <label>Product Price</label>
                            </td>
                            <td>
                                <input type="number" name="productPrice" value={productInputs.productPrice} onChange={handleInputChange} />
                            </td>
                            <td>
                                <label>Product Quantity</label>
                            </td>
                            <td>
                                <input type="number" name="productQty" value={productInputs.productQty} onChange={handleInputChange} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Product Category</label>
                            </td>
                            <td>
                                <input type="text" name="productCategory" value={productInputs.productCategory} onChange={handleInputChange} />
                            </td>
                            <td>
                                <label>Expiration Date</label>
                            </td>
                            <td>
                                <input type="date" name="expirationDate" value={productInputs.expirationDate} onChange={handleInputChange} />
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
}

export default AddProductForm;