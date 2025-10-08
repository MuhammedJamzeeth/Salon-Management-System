package com.jamsy.shop.service;

import com.jamsy.shop.entity.AttEntity;

import java.util.List;

public interface AttendanceService {
    AttEntity addAttendance(AttEntity attendance);

    AttEntity updateAttendance(Long AttId,AttEntity attendance);
    List<AttEntity> getAllAttendance();
    void deleteAttendance(Long AttId);

    AttEntity getAttendanceById(Long AttId);
}
