package com.jamsy.shop.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductModel {

    private Long productId;
    private String productName;
    private int productQty;
    private Double productPrice;
    private String productCategory;
    private String expirationDate;
    private byte[] productImage;

}
