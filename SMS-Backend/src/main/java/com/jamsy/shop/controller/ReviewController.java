package com.jamsy.shop.controller;

import com.jamsy.shop.entity.Review;
import com.jamsy.shop.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ReviewController {


    @Autowired
    private ReviewService reviewService;

    @GetMapping("/reviews")
    public List<Review> getAllReviews() {
        return reviewService.getAllReviews();
    }

    @DeleteMapping("/review/{id}")
    public String deleteReviewById(@PathVariable("id") Long id){
        reviewService.deleteReviewById(id);
        return "Successfully Deleted..!";
    }

    @PostMapping("/addReview")
    public Review addReview(@ModelAttribute Review review) {
        return reviewService.addReview(review);
    }
}
