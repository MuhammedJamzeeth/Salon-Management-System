package com.jamsy.shop.service;


import com.jamsy.shop.entity.Product;

import java.util.List;

public interface ProductService {

    List<Product> getAllProducts();
    void deleteProduct(Long id);
    Product saveProduct(String productName, Double productPrice, Integer productQty, String productCategory, String expirationDate, byte[] img);
    Product updateProduct(Long id, String productName, Double productPrice, Integer productQty, String productCategory, String expirationDate, byte[] img);
}


