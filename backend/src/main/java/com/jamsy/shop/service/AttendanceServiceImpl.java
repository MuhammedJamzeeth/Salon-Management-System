package com.jamsy.shop.service;

import com.jamsy.shop.entity.AttEntity;
import com.jamsy.shop.repository.AttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AttendanceServiceImpl implements AttendanceService {
    @Autowired
    private AttendanceRepository attendanceRepository;

    @Override
    public AttEntity addAttendance(AttEntity attendance){
        AttEntity attEntity = new AttEntity();
        attEntity.setEmpName(attendance.getEmpName());
        attEntity.setAttDate(attendance.getAttDate());
        attEntity.setEmpId(attendance.getEmpId());
        attEntity.setTimeIn(attendance.getTimeIn());
        attEntity.setTimeOut(attendance.getTimeOut());
        attEntity.setStatus(attendance.getStatus());
//        attEntity.setCreatedAtt(attendance.getCreatedAtt());
        attEntity.setUpdatedAtt(attendance.getUpdatedAtt());

        return attendanceRepository.save(attEntity);
    }

    @Override
    public List<AttEntity> getAllAttendance() {
        return attendanceRepository.findAll();
    }

//    public AttEntity updateAttendance(Long AttId,AttEntity attendance){
//        Optional<AttEntity> existingAttendance=attendanceRepository.findById(AttId);
//
//        if(existingAttendance.isPresent()){
//            AttEntity entityToUpdate = existingAttendance.get();
//            entityToUpdate.setEmpName(attendance.getEmpName());
//            entityToUpdate.setEmpId(attendance.getEmpId());
//            entityToUpdate.setAttDate(attendance.getAttDate());
//            entityToUpdate.setTimeIn(attendance.getTimeIn());
//            entityToUpdate.setTimeOut(attendance.getTimeOut());
//            entityToUpdate.setStatus(attendance.getStatus());
//            entityToUpdate.setUpdatedAtt(new java.util.Date());
//
//            return attendanceRepository.save(entityToUpdate);
//        } else {
//            throw new IllegalArgumentException("Attendance with id" + AttId + "Not found");
//        }
//    }

    @Override
    public AttEntity updateAttendance(Long AttId,AttEntity updatedAtt){
        AttEntity existingAtt = attendanceRepository.findById(AttId).orElseThrow(() -> new IllegalArgumentException("ser with id" + AttId + "not found"));

        if (updatedAtt.getEmpName() != null) {
            existingAtt.setEmpName(updatedAtt.getEmpName());
        }
        if(updatedAtt.getEmpId() != null) {
            existingAtt.setEmpId(updatedAtt.getEmpId());
        }
        if(updatedAtt.getAttDate() != null) {
            existingAtt.setAttDate(updatedAtt.getAttDate());
        }
        if (updatedAtt.getTimeIn() != null) {
            existingAtt.setTimeIn(updatedAtt.getTimeIn());
        }
        if (updatedAtt.getTimeOut() != null) {
            existingAtt.setTimeOut(updatedAtt.getTimeOut());
        }
        if (updatedAtt.getStatus() != null) {
            existingAtt.setStatus(updatedAtt.getStatus());
        }

        return attendanceRepository.save(existingAtt);
    }

    @Override
    public void deleteAttendance(Long id) {
        if(attendanceRepository.existsById(id)){
            attendanceRepository.deleteById(id);
        }else {
            throw new IllegalArgumentException("Attendance not found");
        }
    }

    @Override
    public AttEntity getAttendanceById(Long AttId) {
        return null;
    }
}
