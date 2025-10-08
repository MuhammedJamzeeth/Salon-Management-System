package com.jamsy.shop.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ServiceModel {
    private Long serviceId;
    private String serviceName;
    private String serviceDescription;
    private double servicePrice;
    private String serviceState;
    private Date serviceDate;
    private List<ServiceModel> serviceModelList;
}