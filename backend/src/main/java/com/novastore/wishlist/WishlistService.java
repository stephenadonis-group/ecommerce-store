package com.novastore.wishlist;

import com.novastore.auth.User;
import com.novastore.auth.UserRepository;
import com.novastore.exception.ResourceNotFoundException;
import com.novastore.product.Product;
import com.novastore.product.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public List<Product> getWishlist(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Wishlist wishlist = getOrCreateWishlist(user);
        return new ArrayList<>(wishlist.getProducts());
    }

    @Transactional
    public List<Product> toggleProduct(String email, Long productId) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        Wishlist wishlist = getOrCreateWishlist(user);

        if (wishlist.getProducts().contains(product)) {
            wishlist.getProducts().remove(product);
        } else {
            wishlist.getProducts().add(product);
        }

        wishlistRepository.save(wishlist);
        return new ArrayList<>(wishlist.getProducts());
    }

    private Wishlist getOrCreateWishlist(User user) {
        return wishlistRepository.findByUserId(user.getId())
                .orElseGet(() -> {
                    Wishlist wishlist = Wishlist.builder().user(user).products(new HashSet<>()).build();
                    return wishlistRepository.save(wishlist);
                });
    }
}
