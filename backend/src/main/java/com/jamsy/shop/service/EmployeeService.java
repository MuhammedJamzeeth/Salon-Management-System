package com.jamsy.shop.service;

import com.jamsy.shop.entity.Employee;
import com.jamsy.shop.entity.Product;

import java.util.List;

public interface EmployeeService {
    public Employee saveEmployee(Employee employee);

    public List<Employee> fatchEmployeeList();

    public long getEmployeeCount();

   public Employee fetchEmployeeById(Long employeeId);

    void deleteEmployee(Long id);

    //List<Product> findAllProductsByName(String name);

    List<Product> findAllProductsByName(String name);

    Employee updateEmployee(Long id, Employee employee);

    List<Employee> getAllEmployees();


}
