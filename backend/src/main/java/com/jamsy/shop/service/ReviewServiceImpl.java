package com.jamsy.shop.service;

import com.jamsy.shop.entity.Review;
import com.jamsy.shop.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class ReviewServiceImpl implements ReviewService{


    @Autowired
    private ReviewRepository reviewRepository;

    @Override
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }


    @Override
    public Review addReview(Review review) {

        return reviewRepository.save(review);
    }

    @Override
    public void deleteReviewById(Long id) {
        reviewRepository.deleteById(id);
    }
}
