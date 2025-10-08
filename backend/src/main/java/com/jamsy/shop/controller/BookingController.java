package com.jamsy.shop.controller;

import com.jamsy.shop.model.BookingDetails;
import com.jamsy.shop.service.BookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class BookingController {

    private final BookingService bookingService;
    @PostMapping("/bookings")
    public ResponseEntity<?> book(@Valid @RequestBody BookingDetails bookingDetails){
        System.out.println(bookingDetails);
        bookingService.bookAppointment(bookingDetails);
        return ResponseEntity.ok("Booked Successfully");
    }
}
