package com.jamsy.shop.service;

import com.jamsy.shop.model.ServiceModel;
import com.jamsy.shop.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceServiceImpl implements ServiceService{
    @Autowired
    ServiceRepository serviceRepository;

    @Override
    public ServiceModel addService(ServiceModel service) {
        return serviceRepository.save(service);
    }

    @Override
    public List<ServiceModel> getAllServices() {
        return serviceRepository.findAll();
    }

    @Override
    public ServiceModel updateService(Long id, ServiceModel updatedService) {
        ServiceModel existingService = serviceRepository.findById(Long.valueOf(Math.toIntExact(id)))
                .orElseThrow(()-> new IllegalArgumentException("Service with id " + id + " not found"));

        // Update only the fields that are not null in the updatedProduct
        if(updatedService.getServiceName()!=null){
            existingService.setServiceName(updatedService.getServiceName());
        }
        if (updatedService.getServiceDescription()!=null){
            existingService.setServiceDescription(updatedService.getServiceDescription());
        }
        if(updatedService.isServiceStatus()){
            existingService.setServiceStatus(true);
        }
        return serviceRepository.save(existingService);
    }

    @Override
    public void deleteService(Long id) {
        if(serviceRepository.existsById((long) Math.toIntExact(id))){
            serviceRepository.deleteById((long) Math.toIntExact(id));
        }else{
            throw new IllegalArgumentException("Service with id " + id + " not found");
        }
    }

    @Override
    public ServiceModel getServiceById(Long id) {
        return serviceRepository.findById((long) Math.toIntExact(id)).orElseThrow(()-> new IllegalArgumentException("Service with id "+ id +" not found"));
    }
}
