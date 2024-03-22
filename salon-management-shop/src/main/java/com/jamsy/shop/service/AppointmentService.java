package com.jamsy.shop.service;

import com.jamsy.shop.entity.Appointment;

import java.util.List;

public interface AppointmentService {
    Appointment saveAppointment(Appointment appointment);
    List<Appointment> findAllProduct();
}
