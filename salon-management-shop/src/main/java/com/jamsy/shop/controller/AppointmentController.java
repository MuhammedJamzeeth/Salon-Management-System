package com.jamsy.shop.controller;

import com.jamsy.shop.entity.Appointment;
import com.jamsy.shop.service.AppointmentService;
import com.jamsy.shop.service.UserService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/appointment")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AppointmentController {

    private final AppointmentService appointmentService;

    @PostMapping("/save")
    public ResponseEntity<?> saveAppointment(@ModelAttribute Appointment appointment){
        System.out.println(appointment);
        return ResponseEntity.ok(appointmentService.saveAppointment(appointment));
    }
    @GetMapping("/view")
    public ResponseEntity<List<Appointment>> getAllAppointment(){
        List<Appointment> appointment = appointmentService.findAllProduct();
        System.out.println(appointment);
        return ResponseEntity.ok((appointment));
    }
}
