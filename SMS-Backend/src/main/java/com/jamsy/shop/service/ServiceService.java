package com.jamsy.shop.service;

import com.jamsy.shop.entity.ServiceEntity;

import java.util.List;

public interface ServiceService {
    ServiceEntity saveService(ServiceEntity service);
    List<ServiceEntity> getAllServices();
    ServiceEntity updateService(Long id, ServiceEntity service);
    void deleteService(Long id);
    ServiceEntity getServiceById(Long id);
}
