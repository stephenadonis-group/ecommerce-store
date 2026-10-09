package com.novastore.wishlist;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/wishlist")
@RequiredArgsConstructor
public class WishlistController {

    private final WishlistService wishlistService;

    @GetMapping
    public ResponseEntity<?> getWishlist(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(wishlistService.getWishlist(userDetails.getUsername()));
    }

    @PostMapping("/{productId}")
    public ResponseEntity<?> toggleProduct(@AuthenticationPrincipal UserDetails userDetails,
                                           @PathVariable Long productId) {
        return ResponseEntity.ok(wishlistService.toggleProduct(userDetails.getUsername(), productId));
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<?> removeProduct(@AuthenticationPrincipal UserDetails userDetails,
                                           @PathVariable Long productId) {
        return ResponseEntity.ok(wishlistService.toggleProduct(userDetails.getUsername(), productId));
    }
}
