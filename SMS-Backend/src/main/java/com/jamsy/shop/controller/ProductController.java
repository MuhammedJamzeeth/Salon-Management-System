package com.jamsy.shop.controller;

import com.jamsy.shop.entity.Product;
import com.jamsy.shop.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class ProductController {
    @Autowired
    private ProductService productService;

    @PostMapping("/addproduct")
    public Product addProduct(@RequestBody Product product){
        return productService.saveProduct(product);
    }

    @GetMapping("/getallproducts")
    public List<Product> getAllProducts(){
        return productService.getAllProducts();
    }

    @PutMapping("/updateproduct/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product product){
        return productService.updateProduct(id,product);
    }

    @DeleteMapping("/deleteproduct/{id}")
    public void deleteProduct(@PathVariable Long id){
        productService.deleteProduct(id);
    }

}
