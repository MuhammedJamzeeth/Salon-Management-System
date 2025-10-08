package com.jamsy.shop.controller;

import com.jamsy.shop.entity.Product;
import com.jamsy.shop.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin
@RestController
public class ProductController {
    @Autowired
    private ProductService productService;

    @PostMapping(value = "/addProducts", consumes = "multipart/form-data")
    public ResponseEntity<Product> saveProduct(
            @RequestParam("productName") String productName,
            @RequestParam("productPrice") Double productPrice,
            @RequestParam("productQty") Integer productQty,
            @RequestParam("productCategory") String productCategory,
            @RequestParam("expirationDate") String expirationDate,
            @RequestParam("productImage") MultipartFile productImage){
        try {
            byte[] img = productImage.getBytes();
            Product savedProduct = productService.saveProduct(
                    productName,
                    productPrice,
                    productQty,
                    productCategory,
                    expirationDate,
                    img);
            return ResponseEntity.ok(savedProduct);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }

    }

    @GetMapping("/getallproducts")
    public List<Product> getAllProducts(){
        return productService.getAllProducts();
    }

    @PutMapping(value = "/updateproduct/{productId}", consumes = "multipart/form-data")
    public ResponseEntity<Product> updateProduct(
            @PathVariable("productId") Long id,
            @RequestParam("productName") String productName,
            @RequestParam("productPrice") Double productPrice,
            @RequestParam("productQty") Integer productQty,
            @RequestParam("productCategory") String productCategory,
            @RequestParam("expirationDate") String expirationDate,
            @RequestParam(value = "productImage",required = false) MultipartFile productImage) {
        try {
            byte[] img = null;
            if (productImage != null && !productImage.isEmpty()) {
                img = productImage.getBytes();
            }
            Product updatedProduct = productService.updateProduct(id, productName, productPrice, productQty, productCategory, expirationDate, img);
            return ResponseEntity.ok(updatedProduct);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/deleteproduct/{id}")
    public void deleteProduct(@PathVariable Long id){
        productService.deleteProduct(id);
    }

}
