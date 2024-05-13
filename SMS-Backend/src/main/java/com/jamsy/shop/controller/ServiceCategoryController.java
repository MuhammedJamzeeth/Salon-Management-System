package com.jamsy.shop.controller;

import com.jamsy.shop.entity.ServiceCategory;
import com.jamsy.shop.service.ServiceCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/service-categories")
public class ServiceCategoryController {

    @Autowired
    private ServiceCategoryService serviceCategoryService;

    @GetMapping("/allcategories")
    public ResponseEntity<List<ServiceCategory>> getAllServiceCategories() {
        List<ServiceCategory> serviceCategories = serviceCategoryService.getAllServiceCategories();
        return ResponseEntity.ok(serviceCategories);
    }

//    @GetMapping("/{id}")
//    public ResponseEntity<ServiceCategory> getServiceCategoryById(@PathVariable Long id) {
//        ServiceCategory serviceCategory = serviceCategoryService.getServiceCategoryById(id);
//        if (serviceCategory != null) {
//            return ResponseEntity.ok(serviceCategory);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }

    @PostMapping("/savecategory")
    public ResponseEntity<ServiceCategory> createServiceCategory(@RequestBody ServiceCategory serviceCategory) {
        ServiceCategory createdServiceCategory = serviceCategoryService.createServiceCategory(serviceCategory);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdServiceCategory);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ServiceCategory> updateServiceCategory(@PathVariable Long id, @RequestBody ServiceCategory serviceCategory) {
        ServiceCategory updatedServiceCategory = serviceCategoryService.updateServiceCategory(id, serviceCategory);
        if (updatedServiceCategory != null) {
            return ResponseEntity.ok(updatedServiceCategory);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteServiceCategory(@PathVariable Long id) {
        serviceCategoryService.deleteServiceCategory(id);
        return ResponseEntity.noContent().build();
    }
}

