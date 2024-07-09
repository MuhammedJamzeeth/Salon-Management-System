import React, { useState } from 'react';
import './ProductList.css'; // Import CSS file
import Swal from 'sweetalert2';

const ProductList = ({ products, onDeleteProduct, onEdit }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Filter products based on search term
    const filteredProducts = products.filter(product =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    //DELETE THE PRODUCT BY ID
    const handleDeleteProduct = async (productId) => {
    // DISPLAY CONFIRMATION DIALOG
    Swal.fire({
        title: 'Do you want to delete?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            // Call onDeleteProduct function passed from Inventory component
            onDeleteProduct(productId);
        } 
    });
}

    return (
        <>
        <div className="searchbar">
            <h4>Search: </h4>
            {/* Searchbar */}
                <input
                    type="text"
                    placeholder="Search by product name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-bar"
                />
        </div>
        <div className="product-list-container">
            <div className="product-table-wrapper">
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Product Image</th>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Expiration Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product) => (
                            <tr key={product.productId}>
                                <td>
                                    <img
                                        src={`data:image/jpeg;base64,${product.productImage}`}
                                        alt='abc'
                                        style={{ width: '70px', height: '70px', borderRadius: '30px' }}
                                    />
                                </td>
                                <td>{product.productId}</td>
                                <td>{product.productName}</td>
                                <td>{product.productQty}</td>
                                <td>Rs. {product.productPrice}</td>
                                <td>{product.productCategory}</td>
                                <td>{product.expirationDate}</td>
                                <td>
                                    <button className="edit-btn" onClick={() => onEdit(product.productId)}>Edit</button>
                                    <button className="delete-btn" onClick={() => handleDeleteProduct(product.productId)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </>
    );
};

export default ProductList;