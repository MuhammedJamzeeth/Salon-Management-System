package com.jamsy.shop.service;

import com.jamsy.shop.entity.Product;
import com.jamsy.shop.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product saveProduct(String productName, Double productPrice, Integer productQty, String productCategory, String expirationDate, byte[] productImage) {
        Product p = new Product();
        p.setProductName(productName);
        p.setProductPrice(productPrice);
        p.setProductQty(productQty);
        p.setProductCategory(productCategory);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate date = LocalDate.parse(expirationDate, formatter);
        p.setExpirationDate(String.valueOf(date));
        p.setProductImage(productImage);

        return productRepository.save(p);
    }

    @Override
    public Product updateProduct(Long id, String productName, Double productPrice, Integer productQty, String productCategory, String expirationDate, byte[] productImage) {
        Product existingProduct = productRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Product with id " + id + " not found"));

        if (productName != null) {
            existingProduct.setProductName(productName);
        }
        if (productCategory != null) {
            existingProduct.setProductCategory(productCategory);
        }
        if (productQty != null) {
            existingProduct.setProductQty(productQty);
        }
        if (productPrice != null) {
            existingProduct.setProductPrice(productPrice);
        }
        if (expirationDate != null) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDate date = LocalDate.parse(expirationDate, formatter);
            existingProduct.setExpirationDate(String.valueOf(date));
        }
        if (productImage != null) {
            existingProduct.setProductImage(productImage);
        }

        return productRepository.save(existingProduct);
    }

    @Override
    public void deleteProduct(Long id) {
        if(productRepository.existsById(id)){
            productRepository.deleteById(id);
        }else {
            throw new IllegalArgumentException("Product not found");
        }
    }
}