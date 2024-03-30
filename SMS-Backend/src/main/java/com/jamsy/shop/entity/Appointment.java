package com.jamsy.shop.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String customerName;
    private String customerEmail;
    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;
    private String category;
    private String date;
    private String time;


}
