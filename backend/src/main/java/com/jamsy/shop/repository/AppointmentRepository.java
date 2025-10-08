package com.jamsy.shop.repository;

import com.jamsy.shop.entity.Appointment;
import com.jamsy.shop.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByEmployee(Optional<Employee> employee);

    List<Appointment> findByEmployeeAndAndDate(Employee employee, String date);
}
