package com.jamsy.shop.repository;

import com.jamsy.shop.entity.AttEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AttendanceRepository extends JpaRepository<AttEntity, Long> {
}
