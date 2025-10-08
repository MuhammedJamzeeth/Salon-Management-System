package com.jamsy.shop.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "Product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;

    private String productName;
    private int productQty; //track inventory level
    private double productPrice;
    private String productCategory;
    private String expirationDate;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] productImage;

}

