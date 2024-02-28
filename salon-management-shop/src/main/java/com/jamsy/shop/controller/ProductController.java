package com.jamsy.shop.controller;

import com.jamsy.shop.model.Product;
import com.jamsy.shop.service.product.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    ProductService productService;

    @PostMapping("/add")
    public String addProduct(@RequestBody Product product){
        productService.saveProduct(product);
        return "New Product is added";
    }

    @GetMapping("/getAll")
    public List<Product> getAllProducts(){
        productService.getAllProducts();
        return productService.getAllProducts();
    }




}
