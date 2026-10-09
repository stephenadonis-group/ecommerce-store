package com.novastore.order.dto;

import javax.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class PlaceOrderRequest {
    @NotBlank private String shippingAddress;
    @NotBlank private String city;
    @NotBlank private String postalCode;
    @NotBlank private String paymentMethod;
}
