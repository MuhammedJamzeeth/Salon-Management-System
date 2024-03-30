package com.jamsy.shop.repository;

import com.jamsy.shop.model.ServiceModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceRepository extends JpaRepository<ServiceModel, Long> {
    //crud
}
