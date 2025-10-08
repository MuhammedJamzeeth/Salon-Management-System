package com.jamsy.shop.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AttendanceModel {
    private Long AttId;
    private String empName;
    private Integer EmpId;
    private String AttDate;
    private Time TimeIn;
    private Time TimeOut;
    private String Status;
    private Date UpdatedAtt;
    private List<AttendanceModel> AttendanceModelList;

}
