package com.jamsy.shop.service;

import com.jamsy.shop.entity.Review;
import org.springframework.stereotype.Service;

import java.util.List;

public interface ReviewService {
    List<Review> getAllReviews();


    Review addReview(Review review);

    public void deleteReviewById(Long id);
}
