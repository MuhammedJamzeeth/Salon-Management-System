package com.jamsy.shop.model;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class BookingDetails {

    @Email(message = "Email should be valid")
    @NotBlank(message = "Customer email is mandatory")
    private String customerEmail;

    @NotBlank(message = "Customer name is mandatory")
    @Size(max = 100, message = "Customer name should not exceed 100 characters")
    private String customerName;

    @NotBlank(message = "Services are mandatory")
    private String services;

    @NotBlank(message = "Date is mandatory")
    private String date;

    @NotBlank(message = "Time is mandatory")
    private String time;

    @NotBlank(message = "Employee is mandatory")
    private String employee;

    @NotBlank(message = "Phone number is mandatory")
    @Pattern(regexp = "\\d{10}", message = "Phone number should be 10 digits")
    private String pno;

    @NotBlank(message = "Payment method is mandatory")
    private String paymentMethod;

    @NotNull(message = "Amount is mandatory")
    private Double amount;
}
