package com.novastore.product.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class ProductRequest {
    @NotBlank private String title;
    private String description;
    @NotNull private BigDecimal price;
    private BigDecimal discountPercentage;
    private Double rating;
    private Integer stock;
    private String brand;
    @NotBlank private String category;
    private String thumbnail;
    private List<String> images;
    private String warrantyInformation;
    private String shippingInformation;
}
