package com.jamsy.shop.model;

import com.jamsy.shop.entity.Appointment;
import com.jamsy.shop.token.Token;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

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
    private String empJoiningDate;
    private String empDateOfBirth;
    private byte[] empProfilePhoto;
    private String empService;
    private Boolean isAvailable;
    @OneToMany(mappedBy = "appointment")
    private List<Appointment> appointments;

}
