package com.jamsy.shop.service;

import com.jamsy.shop.entity.Appointment;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface AppointmentService {
    Appointment saveAppointment(Appointment appointment);
    List<Appointment> getAppointmentDetails();


    Optional<Appointment> setApprove(Boolean isApprove, Long id);

    List<Appointment> getAllAppointmentByEmployeeId(@NotNull Long id);
}
