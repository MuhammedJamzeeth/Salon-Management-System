package com.jamsy.shop.controller;

import com.jamsy.shop.model.Product;
import com.jamsy.shop.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class ProductController {

    @Autowired
    ProductService productService;

    @PostMapping("/addproduct")
    public Product saveProduct(@RequestBody Product product){
        System.out.println(product);
        return productService.addProduct(product);
    }

    @GetMapping("/getallproducts")
    public List<Product> getAllProducts(){
        return productService.getAllProducts();
    }

    @PutMapping("/updateproduct/{id}")
    public Product updateProduct(@PathVariable long id, @RequestBody Product product){
        return productService.updateProduct(id, product);
    }

    @DeleteMapping("/deleteproduct/{id}")
    public void deleteProduct(@PathVariable long id) {
        productService.deleteProduct(id);
    }

    @GetMapping("/getproductbyid/{id}")
    public Product getProductById(@PathVariable long id) {
        return productService.getProductById(id);
    }
}
