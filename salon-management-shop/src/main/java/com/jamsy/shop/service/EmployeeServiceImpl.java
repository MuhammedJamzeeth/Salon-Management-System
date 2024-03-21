package com.jamsy.shop.service;

import com.jamsy.shop.entity.Employee;
import com.jamsy.shop.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService{
    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public Employee saveEmployee(Employee employee) {
        Employee employees = new Employee();
        employees.setEmpEmail(employee.getEmpEmail());
        employees.setEmpGender(employee.getEmpGender());
        employees.setEmpPhone(employee.getEmpPhone());
        employees.setEmpIc(employee.getEmpIc());
        employees.setEmpAddress(employee.getEmpAddress());
        employees.setEmpFirstName(employee.getEmpFirstName());
        employees.setEmpLastName(employee.getEmpLastName());
        employeeRepository.save(employees);

        return employees;
    }

    @Override
    public List<Employee> fatchEmployeeList() {
        return employeeRepository.findAll();
    }

    @Override
    public long getEmployeeCount() {
        return employeeRepository.count();
    }

    @Override
    public Employee fetchEmployeeById(Long employeeId) {
        return employeeRepository.findById(employeeId).get();
    }




}
