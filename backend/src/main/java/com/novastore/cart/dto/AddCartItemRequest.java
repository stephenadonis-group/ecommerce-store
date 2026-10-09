package com.novastore.cart.dto;

import javax.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AddCartItemRequest {
    @NotNull private Long productId;
    private Integer quantity = 1;
}
