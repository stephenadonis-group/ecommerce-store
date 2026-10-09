package com.novastore.review.dto;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ReviewRequest {
    @NotNull @Min(1) @Max(5) private Integer rating;
    private String comment;
}
