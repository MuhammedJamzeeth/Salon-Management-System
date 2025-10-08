package com.jamsy.shop.service;

import com.jamsy.shop.entity.Appointment;

import com.jamsy.shop.entity.Employee;
import com.jamsy.shop.repository.AppointmentRepository;
import com.jamsy.shop.repository.EmployeeRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
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
        saveAppointment.setPno(appointment.getPno());

        appointmentRepository.save(saveAppointment);
        return saveAppointment;
    }

    @Override
    public List<Appointment> getAppointmentDetails() {
        List<Appointment> appointments = appointmentRepository.findAll(Sort.by(Sort.Direction.DESC,"id"));
        return appointments;
    }



    @Override
    public Optional<Appointment> setApprove(Boolean isApprove, Long id) {
        Optional<Appointment> appointmentOptional = appointmentRepository.findById(id);

        if (appointmentOptional.isPresent()) {
            Appointment appointment = appointmentOptional.get();
            appointment.setApproved(isApprove);
            appointmentRepository.save(appointment);
            return Optional.of(appointment);
        } else {
            // Handle case where appointment with the specified id doesn't exist
            return Optional.empty();
        }
    }

    @Override
    public List<Appointment> getAllAppointmentByEmployeeId(@NonNull Long id) {
        final Optional<Employee> employeeGet = employeeRepository.findById(id);
        final var appointments = appointmentRepository.findByEmployee(employeeGet);
        return appointments;
    }

    private boolean isEmployeeAlreadyBooked(Employee employeeId, String date) {
        List<Appointment> appointments = appointmentRepository.findByEmployeeAndAndDate(employeeId, date);
        return !appointments.isEmpty();
    }
}
