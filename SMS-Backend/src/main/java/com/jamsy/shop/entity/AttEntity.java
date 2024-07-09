package com.jamsy.shop.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name="Attendance")
public class AttEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long AttId;
    private String empName;
    private Integer EmpId;
    private String AttDate;
    private Time TimeIn;
    private Time TimeOut;
    private String Status;
    private Date UpdatedAtt;

}
