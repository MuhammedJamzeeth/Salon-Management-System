package com.jamsy.shop.service;

import com.jamsy.shop.entity.Employee;

import java.util.List;

public interface EmployeeService {
    public Employee saveEmployee(Employee employee);

    public List<Employee> fatchEmployeeList();

    public long getEmployeeCount();

   public Employee fetchEmployeeById(Long employeeId);


}
