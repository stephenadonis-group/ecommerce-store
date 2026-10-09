package com.novastore.cart.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class CartResponse {
    private Long id;
    private List<CartItemResponse> items;
    private BigDecimal total;

    @Data
    public static class CartItemResponse {
        private Long productId;
        private String title;
        private String thumbnail;
        private BigDecimal price;
        private Integer quantity;
        private BigDecimal subtotal;
    }
}
