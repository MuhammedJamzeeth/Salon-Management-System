package com.jamsy.shop.service;

import com.jamsy.shop.model.Product;
import com.jamsy.shop.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public Product addProduct(Product product) {
//        Product product1 = new Product();
//        product1.setProductName(product.getProductName());
//        product1.setProductPrice(product.getProductPrice());=
//        product1.setProductCategory(product.getProductCategory());
//        product1.setProductQty(product.getProductQty());
//
//        System.out.println(product1);
//        productRepository.save(product);
//        System.out.println("Product details saved");
//        return product;
        return productRepository.save(product);
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

//    @Override
//    public Product updateProduct(int id, Product product) {
//        if (productRepository.existsById(id)) {
//            product.setProductId(id);
//            product.setProductQty(product.getProductQty());
//            product.setProductCategory(product.getProductCategory());
//            product.setProductName(product.getProductName());
//            return productRepository.save(product);
//        } else {
//            throw new IllegalArgumentException("Product with id " + id + " not found");
//        }
//    }

    @Override
    public Product updateProduct(Long id, Product updatedProduct) {
        Product existingProduct = productRepository.findById(Math.toIntExact(id))
                .orElseThrow(() -> new IllegalArgumentException("Product with id " + id + " not found"));

        // Update only the fields that are not null in the updatedProduct
        if (updatedProduct.getProductName() != null) {
            existingProduct.setProductName(updatedProduct.getProductName());
        }
        if (updatedProduct.getProductCategory() != null) {
            existingProduct.setProductCategory(updatedProduct.getProductCategory());
        }
        if (updatedProduct.getProductPrice() != 0) {
            existingProduct.setProductPrice(updatedProduct.getProductPrice());
        }
        if (updatedProduct.getProductQty() != 0) {
            existingProduct.setProductQty(updatedProduct.getProductQty());
        }

        return productRepository.save(existingProduct);
    }

    @Override
    public void deleteProduct(Long id) {
        if (productRepository.existsById(Math.toIntExact(id))){
            productRepository.deleteById(Math.toIntExact(id));
        } else {
            throw new IllegalArgumentException("Product with id " + id + " not found");
        }
    }

    @Override
    public Product getProductById(Long id) {
        return productRepository.findById(Math.toIntExact(id))
                .orElseThrow(() -> new IllegalArgumentException("Product with id " + id + " not found"));
    }
}