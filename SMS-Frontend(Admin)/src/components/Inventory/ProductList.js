import React, { useState } from 'react';
import './ProductList.css'; // Import CSS file

const ProductList = ({ products, onEdit, onDelete }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Filter products based on search term
    const filteredProducts = products.filter(product =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
        <div className="searchbar">
            
            {/* Search bar */}
            <h4>Search: </h4>
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
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Expiration Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.slice(0, 5).map((product) => (
                            <tr key={product.productid}>
                                <td>{product.productId}</td>
                                <td>{product.productName}</td>
                                <td>{product.productQty}</td>
                                <td>${product.productPrice}</td>
                                <td>{product.productCategory}</td>
                                <td>{product.expirationDate}</td>
                                <td>{product.productStatus}</td>
                                <td>
                                    <button className="edit-btn" onClick={() => onEdit(product.productid)}>Edit</button>
                                    <button className="delete-btn" onClick={() => onDelete(product.productid)}>Delete</button>
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