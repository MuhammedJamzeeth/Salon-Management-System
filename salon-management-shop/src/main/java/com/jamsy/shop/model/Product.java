package com.jamsy.shop.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Component
@Entity
@Table(name = "Products")
public class Product {
    @Id
    private int productId;
    private String productName;
    private String productCategory;
    private Double productPrice;
    private int productQty;
}
