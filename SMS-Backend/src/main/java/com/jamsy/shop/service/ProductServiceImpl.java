package com.jamsy.shop.service;

import com.jamsy.shop.entity.Product;
import com.jamsy.shop.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public Product saveProduct(Product product) {
        Product p = new Product();
        String productState = calculateProductState(product.getProductQty());
        p.setProductName(product.getProductName());
        p.setProductPrice(product.getProductPrice());
        p.setProductQty(product.getProductQty());
        p.setProductCategory(product.getProductCategory());
        p.setExpirationDate(product.getExpirationDate());
        p.setProductStatus(productState);

        return productRepository.save(p);
    }

    // Helper method to calculate productState based on productQuantity
    private String calculateProductState(int productQuantity) {
        // Logic to determine productState based on productQuantity
        if (productQuantity >= 0 && productQuantity <= 5) {
            return "Out of Stock";
        } else if (productQuantity >= 6 && productQuantity <= 15) {
            return "Running Low";
        } else if (productQuantity >= 16 && productQuantity <= 25) {
            return "Full";
        }else {
            return "Over Stock";
        }
    }

    @Override
    public void deleteProduct(Long id) {
        if(productRepository.existsById(id)){
            productRepository.deleteById(id);
        }else {
            throw new IllegalArgumentException("Product not found");
        }
    }

    @Override
    public Product updateProduct(Long id, Product updatedProduct) {
        Product existingProduct = productRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("service with id " + id + " not found"));
        // Calculate productState based on updated productQuantity
        //String productState = calculateProductState(updatedProduct.getProductQty());

        if (updatedProduct.getProductName() != null) {
            existingProduct.setProductName(updatedProduct.getProductName());
        }
        if (updatedProduct.getProductCategory() != null) {
            existingProduct.setProductCategory(updatedProduct.getProductCategory());
        }
        if (updatedProduct.getProductQty() != 0) {
            existingProduct.setProductQty(updatedProduct.getProductQty());
        }
        if (updatedProduct.getProductPrice() != 0) {
            existingProduct.setProductPrice(updatedProduct.getProductPrice());
        }
        if (updatedProduct.getExpirationDate() != null) {
            existingProduct.setExpirationDate(updatedProduct.getExpirationDate());
        }
        // Set productState based on calculation
        if (updatedProduct.getProductStatus() != null){
            existingProduct.setProductStatus(calculateProductState(updatedProduct.getProductQty()));
        }

        return productRepository.save(existingProduct);
    }
}