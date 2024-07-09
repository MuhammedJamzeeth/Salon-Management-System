package com.jamsy.shop.service;

import com.jamsy.shop.entity.ServiceEntity;
import com.jamsy.shop.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceServiceImpl implements ServiceService{
    @Autowired
    private ServiceRepository serviceRepository;

    //Save a new service to database
    @Override
    public ServiceEntity saveService(ServiceEntity service) {
        // Save the new ServiceEntity object to the database
        return serviceRepository.save(service);
    }

    //List all services
    @Override
    public List<ServiceEntity> getAllServices() { return serviceRepository.findAll();}

    //Update service details
    @Override
    public ServiceEntity updateService(Long id, ServiceEntity updatedService) {
        ServiceEntity existingService = serviceRepository.findById((long) Math.toIntExact(id))
                .orElseThrow(()-> new IllegalArgumentException("Service with id " + id + " not found"));

        // Update only the fields that are not null in the updatedProduct
        if(updatedService.getServiceName()!=null){
            existingService.setServiceName(updatedService.getServiceName());
        }
        if (updatedService.getServiceDesc()!=null){
            existingService.setServiceDesc(updatedService.getServiceDesc());
        }
        if(updatedService.getServiceState()!=null){
            existingService.setServiceState(updatedService.getServiceState());
        }
        if(updatedService.getServicePrice() != 0){
            existingService.setServicePrice(updatedService.getServicePrice());
        }
        if(updatedService.getServiceDate() != null){
            existingService.setServiceDate(updatedService.getServiceDate());
        }
        return serviceRepository.save(existingService);
    }

    //Delete a service by id
    @Override
    public void deleteService(Long id) {
        if(serviceRepository.existsById((long) Math.toIntExact(id))){
            serviceRepository.deleteById((long) Math.toIntExact(id));
        }else{
            throw new IllegalArgumentException("Service with id " + id + " not found");
        }
    }

    //Get a service by id
    @Override
    public ServiceEntity getServiceById(Long id) {
        return serviceRepository.findById(id).get();
    }

}
