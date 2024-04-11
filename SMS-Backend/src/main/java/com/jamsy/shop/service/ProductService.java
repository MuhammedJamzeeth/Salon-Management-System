package com.jamsy.shop.service;


import com.jamsy.shop.entity.Product;

import java.util.List;

public interface ProductService {

    List<Product> getAllProducts();
//    Product getProductById(Long id);
    Product saveProduct(Product product);
    void deleteProduct(Long id);
    Product updateProduct(Long id, Product product);

}


