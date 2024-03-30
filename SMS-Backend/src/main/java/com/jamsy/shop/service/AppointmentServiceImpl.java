package com.jamsy.shop.service;

import com.jamsy.shop.entity.Appointment;

import com.jamsy.shop.entity.Employee;
import com.jamsy.shop.repository.AppointmentRepository;
import com.jamsy.shop.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AppointmentServiceImpl implements AppointmentService{

    private final AppointmentRepository appointmentRepository;
    private final EmployeeRepository employeeRepository;
    @Override
    public Appointment saveAppointment(Appointment appointment) {
        Appointment saveAppointment = new Appointment();
        saveAppointment.setCategory(appointment.getCategory());
        saveAppointment.setCustomerName(appointment.getCustomerName());
        saveAppointment.setCustomerEmail(appointment.getCustomerEmail());

        Optional<Employee> employeeGet = employeeRepository.findById(appointment.getEmployee().getEmpId());
        if(employeeGet.isPresent()){
            Employee employeeSet = employeeGet.get();
            saveAppointment.setEmployee(employeeSet);
        }else {
            throw new RuntimeException("Employee not found for empId: " + appointment.getEmployee().getEmpId());

        }
        saveAppointment.setDate(appointment.getDate());
        saveAppointment.setTime(appointment.getTime());

        appointmentRepository.save(saveAppointment);
        return saveAppointment;
    }

    @Override
    public List<Appointment> getAppointmentDetails() {
        List<Appointment> appointments = appointmentRepository.findAll();
        return appointments;
    }
}
