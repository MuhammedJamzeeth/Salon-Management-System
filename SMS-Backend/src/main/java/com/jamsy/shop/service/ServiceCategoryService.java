package com.jamsy.shop.service;

import com.jamsy.shop.entity.ServiceCategory;

import java.util.List;

public interface ServiceCategoryService {
    List<ServiceCategory> getAllServiceCategories();
//    ServiceCategory getServiceCategoryById(Long id);
    ServiceCategory createServiceCategory(ServiceCategory serviceCategory);
    ServiceCategory updateServiceCategory(Long id, ServiceCategory serviceCategory);
    void deleteServiceCategory(Long id);
}
