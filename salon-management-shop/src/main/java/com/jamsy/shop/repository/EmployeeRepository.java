package com.jamsy.shop.repository;

import com.jamsy.shop.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    @Override
    long count();
}
