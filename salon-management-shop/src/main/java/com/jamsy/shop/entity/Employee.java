package com.jamsy.shop.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;


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
    private String empIc;
//    @Column(unique = true,nullable = false)
    private String empEmail;
    private String empAddress;
    private String empGender;
    private String empPhone;

}
