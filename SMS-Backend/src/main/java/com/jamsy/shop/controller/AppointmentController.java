package com.jamsy.shop.controller;

import com.jamsy.shop.entity.Appointment;
import com.jamsy.shop.repository.AppointmentRepository;
import com.jamsy.shop.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/appointment")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AppointmentController {

    private final AppointmentService appointmentService;
    private final AppointmentRepository appointmentRepository;

    @PostMapping("/save")
    public ResponseEntity<?> saveAppointment(@ModelAttribute Appointment appointment){
        System.out.println(appointment);
        List<Appointment> appointmentCheck = appointmentService.getAppointmentDetails();
        for(Appointment appointment1: appointmentCheck ){
            if(appointment1.getDate().equals(appointment.getDate()) && appointment1.getTime().equals(appointment.getTime()) && appointment1.getEmployee().getEmpId().equals(appointment.getEmployee().getEmpId())){
                return new ResponseEntity<>("Date and Time already booked!!!, choose another", HttpStatus.BAD_REQUEST);
            }
        }
        return ResponseEntity.ok(appointmentService.saveAppointment(appointment));
    }
    @GetMapping("/view")
    public ResponseEntity<List<Appointment>> getAllAppointment(){
        List<Appointment> appointment = appointmentService.getAppointmentDetails();
//        System.out.println(appointment);
        return ResponseEntity.ok((appointment));
    }
    @PostMapping("/setApprove/{id}")
    public ResponseEntity<?> setApprove(@RequestBody Boolean isApprove, @PathVariable Long id){
        Optional<Appointment> appointment = appointmentService.setApprove(isApprove, id);
        System.out.println(isApprove);
        return ResponseEntity.ok(appointment);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteAppointment(@PathVariable Long id){
        Optional<Appointment> appointment = appointmentRepository.findById(id);
        try {
            appointmentRepository.deleteById(id);
            return ResponseEntity.ok(appointment);
        }catch (EmptyResultDataAccessException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Error: Appointment with ID " + id + " not found.");
        }
    }
}
