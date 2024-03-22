package com.jamsy.shop.service;

import com.jamsy.shop.entity.Appointment;

import com.jamsy.shop.repository.AppointmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AppointmentServiceImpl implements AppointmentService{

    private final AppointmentRepository appointmentRepository;
    @Override
    public Appointment saveAppointment(Appointment appointment) {
        Appointment saveAppointment = new Appointment();
        saveAppointment.setCategory(appointment.getCategory());
        saveAppointment.setCustomerName(appointment.getCustomerName());
        saveAppointment.setCustomerEmail(appointment.getCustomerEmail());
        saveAppointment.setEmpName(appointment.getEmpName());
        saveAppointment.setDate(appointment.getDate());
        saveAppointment.setTime(appointment.getTime());

        appointmentRepository.save(saveAppointment);
        return saveAppointment;
    }

    @Override
    public List<Appointment> findAllProduct() {
        return appointmentRepository.findAll();
    }
}
