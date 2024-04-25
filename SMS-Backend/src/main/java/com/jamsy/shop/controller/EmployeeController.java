package com.jamsy.shop.controller;

import com.jamsy.shop.entity.Employee;
import com.jamsy.shop.repository.EmployeeRepository;
import com.jamsy.shop.service.EmployeeService;
import com.jamsy.shop.service.EmployeeServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private EmployeeRepository employeeRepository;

    @PostMapping("/employee")
    public Employee saveEmployee(@ModelAttribute Employee employee){
        System.out.println(employee);
        return employeeService.saveEmployee(employee);
    }

    @GetMapping("/employees")
    public ResponseEntity<List<Employee>> fetchEmployeeList(){
        List<Employee> emp = employeeRepository.findAll();
        return ResponseEntity.ok(emp);
    }

    @GetMapping("/employees/count")
    public long getEmployeeCount() {
        return employeeService.getEmployeeCount();
    }

    @GetMapping("/employee/{empId}")
    public Employee fetchEmployeeById(@PathVariable("empId")Long employeeId){
        return employeeService.fetchEmployeeById(employeeId);

    }

    @DeleteMapping("employees/{empId}")
    public void deleteEmployee(@PathVariable Long id){
        employeeRepository.deleteById(id);
        System.out.println(id+"Successfully deleted..");

    }


}
