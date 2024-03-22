package com.jamsy.shop.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@Table(name="Service")
public class ServiceModel {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "serviceId", nullable = false)
    private Long serviceId;
    private String serviceName;
    private String serviceDescription;
    private double servicePrice;
    private boolean serviceStatus;
    private String imageData;
}
