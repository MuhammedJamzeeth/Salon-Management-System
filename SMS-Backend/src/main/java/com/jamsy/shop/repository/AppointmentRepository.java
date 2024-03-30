package com.jamsy.shop.repository;

import com.jamsy.shop.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
}
