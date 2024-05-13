package com.jamsy.shop.service;

import com.jamsy.shop.entity.ServiceCategory;
import com.jamsy.shop.repository.ServiceCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServiceCategoryServiceImpl implements ServiceCategoryService{

    private final ServiceCategoryRepository serviceCategoryRepository;

    @Autowired
    public ServiceCategoryServiceImpl(ServiceCategoryRepository serviceCategoryRepository) {
        this.serviceCategoryRepository = serviceCategoryRepository;
    }

    @Override
    public List<ServiceCategory> getAllServiceCategories() {
        return serviceCategoryRepository.findAll();
    }

//    @Override
//    public ServiceCategory getServiceCategoryById(Long id) {
//        Optional<ServiceCategory> optionalServiceCategory = serviceCategoryRepository.findById(id);
//        return optionalServiceCategory.orElse(null);
//    }

    @Override
    public ServiceCategory createServiceCategory(ServiceCategory serviceCategory) {
        return serviceCategoryRepository.save(serviceCategory);
    }

    @Override
    public ServiceCategory updateServiceCategory(Long id, ServiceCategory serviceCategory) {
        if (serviceCategoryRepository.existsById(id)) {
            serviceCategory.setCatId(id);
            return serviceCategoryRepository.save(serviceCategory);
        } else {
            return null; // Handle case where the service category with the given ID does not exist
        }
    }

    @Override
    public void deleteServiceCategory(Long id) {
        serviceCategoryRepository.deleteById(id);
    }
}
