package com.jamsy.shop.controller;

import com.jamsy.shop.entity.AttEntity;
import com.jamsy.shop.service.AttendanceService;
import com.jamsy.shop.service.AttendanceServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AttendanceController {

    @Autowired
    AttendanceService attendanceService;

    @PostMapping("/addattendance")
    public AttEntity saveAttendance(@RequestBody AttEntity attendance){
        return attendanceService.addAttendance(attendance);
    }

    @GetMapping("/viewattendance")
    public List<AttEntity> getAllAttendance(){
        return attendanceService.getAllAttendance();
    }

    @DeleteMapping("/deleteattendance/{AttId}")
    public void deleteAttendance(@PathVariable Long AttId){
        attendanceService.deleteAttendance(AttId);
        System.out.println("Attendance Deleted");
    }
    @PutMapping("/updateattendance/{AttId}")
    public AttEntity updateAttendance(@PathVariable Long AttId, @RequestBody AttEntity attEntity){
        return attendanceService.updateAttendance(AttId,attEntity);
    }
}

