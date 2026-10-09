package com.novastore.review;

import com.novastore.auth.User;
import com.novastore.auth.UserRepository;
import com.novastore.exception.ResourceNotFoundException;
import com.novastore.product.Product;
import com.novastore.product.ProductRepository;
import com.novastore.review.dto.ReviewRequest;
import com.novastore.review.dto.ReviewResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public List<ReviewResponse> getProductReviews(Long productId) {
        return reviewRepository.findByProductIdOrderByCreatedAtDesc(productId)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public ReviewResponse addOrUpdateReview(String email, Long productId, ReviewRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        Review review = reviewRepository.findByUserIdAndProductId(user.getId(), productId)
                .orElseGet(() -> Review.builder().user(user).product(product).build());

        review.setRating(request.getRating());
        review.setComment(request.getComment());

        return toResponse(reviewRepository.save(review));
    }

    public void deleteReview(String email, Long reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ResourceNotFoundException("Review not found"));
        if (!review.getUser().getEmail().equals(email)) {
            throw new ResourceNotFoundException("Review not found");
        }
        reviewRepository.delete(review);
    }

    private ReviewResponse toResponse(Review review) {
        ReviewResponse response = new ReviewResponse();
        response.setId(review.getId());
        response.setRating(review.getRating());
        response.setComment(review.getComment());
        response.setCreatedAt(review.getCreatedAt());
        User user = review.getUser();
        if (user != null && user.getFirstName() != null) {
            String lastName = user.getLastName() != null ? user.getLastName() : "";
            response.setReviewerName((user.getFirstName() + " " + lastName).trim());
        }
        return response;
    }
}
