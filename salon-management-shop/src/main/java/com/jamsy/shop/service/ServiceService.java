package com.jamsy.shop.service;

import com.jamsy.shop.model.ServiceModel;

import java.util.List;

public interface ServiceService {
    ServiceModel addService(ServiceModel service);
    List<ServiceModel> getAllServices();
    ServiceModel updateService(Long id, ServiceModel service);
    void deleteService(Long id);
    ServiceModel getServiceById(Long id);
}
