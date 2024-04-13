package com.jamsy.shop.service;

import com.jamsy.shop.entity.Review;
import com.jamsy.shop.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    public List<Review> getAllReviews(){
        return reviewRepository.findAll();
    }

    public Review addReview(@RequestBody Review review){
        return reviewRepository.save(review);
    }
}
