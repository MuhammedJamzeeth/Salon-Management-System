package com.jamsy.shop.service;

import com.jamsy.shop.entity.Employee;
import com.jamsy.shop.entity.Product;
import com.jamsy.shop.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeServiceImpl implements EmployeeService{
    @Autowired
    private EmployeeRepository employeeRepository;

//    @Override
//    public Employee saveEmployee(Employee employee) {
//            Employee employees = new Employee();
//            employees.setEmpEmail(employee.getEmpEmail());
//            employees.setEmpGender(employee.getEmpGender());
//            employees.setEmpPhone(employee.getEmpPhone());
//            employees.setEmpIc(employee.getEmpIc());
//            employees.setEmpAddress(employee.getEmpAddress());
//            employees.setEmpFirstName(employee.getEmpFirstName());
//            employees.setEmpLastName(employee.getEmpLastName());
//            employees.setEmpJoiningDate(employee.getEmpJoiningDate());
//            employees.setEmpDateOfBirth(employee.getEmpDateOfBirth());
////            employee.setEmpProfilePhoto(employee.getEmpProfilePhoto());
//
////            employeeRepository.save(employees);
//
//        return employeeRepository.save(employee) ;
//    }
    @Override
    public Employee saveEmployee(Employee employee) {
         return employeeRepository.save(employee);
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

    @Override
    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }

    @Override
    public List<Product> findAllProductsByName(String name) {
        return null;
    }

    @Override
    public Employee updateEmployee(Long id, Employee updateEmployee) {
        Optional<Employee> optionalEmployee = employeeRepository.findById(id);
        if (optionalEmployee.isPresent()) {
            Employee existingEmployee = optionalEmployee.get();
            existingEmployee.setEmpFirstName(updateEmployee.getEmpFirstName());
             existingEmployee.setEmpLastName(updateEmployee.getEmpLastName());
            existingEmployee.setEmpEmail(updateEmployee.getEmpEmail());
            existingEmployee.setEmpAddress(updateEmployee.getEmpAddress());
            existingEmployee.setEmpPhone(updateEmployee.getEmpPhone());
//            existingEmployee.setEmpProfilePhoto(employee.getEmpProfilePhoto());

            return employeeRepository.save(existingEmployee);
        } else {
            throw new RuntimeException("Employee not found with id: " + id);
        }
    }

    public List<Employee> getAllEmployees(){return employeeRepository.findAll();}


}
