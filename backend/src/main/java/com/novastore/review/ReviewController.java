package com.novastore.review;

import com.novastore.review.dto.ReviewRequest;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping("/api/products/{productId}/reviews")
    public ResponseEntity<?> getReviews(@PathVariable Long productId) {
        return ResponseEntity.ok(reviewService.getProductReviews(productId));
    }

    @PostMapping("/api/products/{productId}/reviews")
    public ResponseEntity<?> addReview(@AuthenticationPrincipal UserDetails userDetails,
                                       @PathVariable Long productId,
                                       @Valid @RequestBody ReviewRequest request) {
        return ResponseEntity.ok(reviewService.addOrUpdateReview(userDetails.getUsername(), productId, request));
    }

    @DeleteMapping("/api/reviews/{id}")
    public ResponseEntity<?> deleteReview(@AuthenticationPrincipal UserDetails userDetails,
                                          @PathVariable Long id) {
        reviewService.deleteReview(userDetails.getUsername(), id);
        return ResponseEntity.noContent().build();
    }
}
