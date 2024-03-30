package com.jamsy.shop.model;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Employee {
    private Long empId;
    private String empFirstName;
    private String empLastName;
    private String empIc;
    private String empEmail;
    private String empAddress;
    private String empGender;
    private String empPhone;

}
