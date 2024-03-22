package com.jamsy.shop.controller;

import com.jamsy.shop.model.ServiceModel;
import com.jamsy.shop.service.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class ServiceController {
    @Autowired
     ServiceService serviceService;

    @PostMapping("/addservice")
    public ServiceModel saveService(@RequestBody ServiceModel service){
        System.out.println(service);
        return serviceService.addService(service);
    }

    @GetMapping("/getallservices")
    public List<ServiceModel> getAllServices(){
        return serviceService.getAllServices();
    }

    @PutMapping("/updateservice/{id}")
    public ServiceModel updateService(@PathVariable Long id,@RequestBody ServiceModel service){
        return serviceService.updateService(id, service);
    }

    @DeleteMapping("/deleteservice/{id}")
    public void deleteService(@PathVariable Long id){
        serviceService.deleteService(id);
    }

    @GetMapping("/getservicebyid/{id}")
    public ServiceModel getServiceById(@PathVariable Long id) {
        return serviceService.getServiceById(id);
    }
}
