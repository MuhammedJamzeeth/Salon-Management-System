package com.jamsy.shop.controller;

import com.jamsy.shop.entity.Employee;
import com.jamsy.shop.entity.Product;
import com.jamsy.shop.repository.EmployeeRepository;
import com.jamsy.shop.service.EmployeeService;
import com.jamsy.shop.service.EmployeeServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private EmployeeRepository employeeRepository;

    @PostMapping("/employee")
    public ResponseEntity<Employee> saveEmployee(
            @RequestParam("empFirstName") String empFirstName,
            @RequestParam("empLastName") String empLastName,
            @RequestParam("empIc") String empIc,
            @RequestParam("empEmail") String empEmail,
            @RequestParam("empAddress") String empAddress,
            @RequestParam("empGender") String empGender,
            @RequestParam("empPhone") String empPhone,
            @RequestParam("empJoiningDate") String empJoiningDate,
            @RequestParam("empDateOfBirth") String empDateOfBirth,
            @RequestParam("empProfilePhoto") MultipartFile empProfilePhoto,
             @RequestParam("empService") String empService
             ){

        try {
            byte[] imageBytes = empProfilePhoto.getBytes();

            Employee employee = new Employee();
            employee.setEmpFirstName(empFirstName);
            employee.setEmpLastName(empLastName);
            employee.setEmpIc(empIc);
            employee.setEmpEmail(empEmail);
            employee.setEmpAddress(empAddress);
            employee.setEmpGender(empGender);
            employee.setEmpPhone(empPhone);
            employee.setEmpJoiningDate(empJoiningDate);
            employee.setEmpDateOfBirth(empDateOfBirth);
            employee.setEmpProfilePhoto(imageBytes);
            employee.setEmpService(empService);


            Employee savedEmployee = employeeService.saveEmployee(employee);
            return ResponseEntity.ok(savedEmployee);
        } catch (IOException e) {e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
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

    @DeleteMapping("/employees/{empId}")
    public void deleteEmployee(@PathVariable("empId") Long id){
        employeeRepository.deleteById(id);
    }

    @PutMapping("/employeeUpdate/{empId}")
    public Employee updateEmployee(@PathVariable("empId") Long id, @RequestBody Employee employee){
        System.out.println("Successfully Updated..!!!");
        return employeeService.updateEmployee(id,employee);
    }

    @GetMapping("employees/vi")
    public List<Employee> getAllEmployees(){ return employeeService.getAllEmployees();}
}
