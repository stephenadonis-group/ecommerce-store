package com.novastore.cart;

import com.novastore.cart.dto.AddCartItemRequest;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping
    public ResponseEntity<?> getCart(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(cartService.getCart(userDetails.getUsername()));
    }

    @PostMapping("/items")
    public ResponseEntity<?> addItem(@AuthenticationPrincipal UserDetails userDetails,
                                     @Valid @RequestBody AddCartItemRequest request) {
        return ResponseEntity.ok(cartService.addItem(userDetails.getUsername(), request));
    }

    @PutMapping("/items/{productId}")
    public ResponseEntity<?> updateQuantity(@AuthenticationPrincipal UserDetails userDetails,
                                            @PathVariable Long productId,
                                            @RequestBody Map<String, Integer> body) {
        return ResponseEntity.ok(cartService.updateItemQuantity(userDetails.getUsername(), productId, body.get("quantity")));
    }

    @DeleteMapping("/items/{productId}")
    public ResponseEntity<?> removeItem(@AuthenticationPrincipal UserDetails userDetails,
                                        @PathVariable Long productId) {
        return ResponseEntity.ok(cartService.removeItem(userDetails.getUsername(), productId));
    }
}
