package com.jamsy.shop.service.product;

import com.jamsy.shop.model.Product;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ProductService {
    public Product saveProduct(Product product);
    public List<Product> getAllProducts();

}
