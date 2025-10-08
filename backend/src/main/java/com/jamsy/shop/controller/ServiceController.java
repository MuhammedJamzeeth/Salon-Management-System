package com.jamsy.shop.controller;

import com.jamsy.shop.entity.ServiceEntity;
import com.jamsy.shop.service.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;


@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ServiceController {
    @Autowired
     ServiceService serviceService;

    @PostMapping( "/addservice")
    public ResponseEntity<ServiceEntity> saveService(@RequestBody ServiceEntity service) {
        try {
            ServiceEntity savedService = serviceService.saveService(service);
            return ResponseEntity.ok(savedService);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/getallservices")
    public List<ServiceEntity> getAllServices(){
        return serviceService.getAllServices();
    }

    @PutMapping("/updateservice/{id}")
    public ServiceEntity updateService(@PathVariable Long id,@RequestBody ServiceEntity service){
        return serviceService.updateService(id, service);
    }

    @DeleteMapping("/deleteservice/{id}")
    public void deleteService(@PathVariable Long id){
        serviceService.deleteService(id);
        System.out.println("service deleted");
    }

    @GetMapping("/getservicebyid/{id}")
    public ServiceEntity getServiceById(@PathVariable Long id) {
        return serviceService.getServiceById(id);
    }
}
