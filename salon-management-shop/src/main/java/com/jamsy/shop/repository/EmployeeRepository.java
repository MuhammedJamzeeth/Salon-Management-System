package com.jamsy.shop.repository;

import com.jamsy.shop.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    @Override
    long count();


    Optional<Employee> findById(Long empId);
}
