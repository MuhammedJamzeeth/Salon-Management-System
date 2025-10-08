package com.jamsy.shop.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "employee")

public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long empId;
    private String empFirstName;
    private String empLastName;

    @NotBlank
    @Column(unique = true)
        private String empIc;

    @NotBlank
    @Email
    @Column(unique = true)

    private String empEmail;
    private String empAddress;
    private String empGender;
    private String empPhone;
    private String empJoiningDate;
    private String empDateOfBirth;
    @Lob
    @Column(name = "emp_profile_photo", columnDefinition = "LONGBLOB")

    private byte[] empProfilePhoto;
    private String empService;
}
