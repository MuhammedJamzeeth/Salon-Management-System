package com.jamsy.shop.entity;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

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
//    @Column(nullable = false)
    private String date;
    private String time;
    private String pno;
    private Boolean approved;



}
