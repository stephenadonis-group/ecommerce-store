package com.novastore.order.dto;

import com.novastore.order.OrderStatus;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderResponse {
    private Long id;
    private List<OrderItemResponse> items;
    private BigDecimal totalAmount;
    private String shippingAddress;
    private String city;
    private String postalCode;
    private String paymentMethod;
    private OrderStatus status;
    private LocalDateTime createdAt;

    @Data
    public static class OrderItemResponse {
        private Long productId;
        private String title;
        private String thumbnail;
        private BigDecimal priceAtPurchase;
        private Integer quantity;
    }
}
