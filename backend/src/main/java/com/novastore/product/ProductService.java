package com.novastore.product;

import com.novastore.exception.ResourceNotFoundException;
import com.novastore.product.dto.ProductRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public Page<Product> getFiltered(String search, String category, BigDecimal minPrice,
                                      BigDecimal maxPrice, Double rating, String sort,
                                      int page, int limit) {
        Sort sortObj;
        switch (sort != null ? sort : "featured") {
            case "price-low":
                sortObj = Sort.by("price").ascending();
                break;
            case "price-high":
                sortObj = Sort.by("price").descending();
                break;
            case "rating":
                sortObj = Sort.by("rating").descending();
                break;
            default:
                sortObj = Sort.by("rating").descending();
                break;
        }

        return productRepository.findFiltered(
                search, category, minPrice, maxPrice, rating,
                PageRequest.of(page - 1, limit, sortObj));
    }

    public Product getById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
    }

    public Product create(ProductRequest request) {
        Product product = Product.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .price(request.getPrice())
                .discountPercentage(request.getDiscountPercentage())
                .rating(request.getRating())
                .stock(request.getStock())
                .brand(request.getBrand())
                .category(request.getCategory())
                .thumbnail(request.getThumbnail())
                .images(request.getImages())
                .warrantyInformation(request.getWarrantyInformation())
                .shippingInformation(request.getShippingInformation())
                .build();
        return productRepository.save(product);
    }

    public Product update(Long id, ProductRequest request) {
        Product product = getById(id);
        product.setTitle(request.getTitle());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setDiscountPercentage(request.getDiscountPercentage());
        product.setRating(request.getRating());
        product.setStock(request.getStock());
        product.setBrand(request.getBrand());
        product.setCategory(request.getCategory());
        product.setThumbnail(request.getThumbnail());
        product.setImages(request.getImages());
        product.setWarrantyInformation(request.getWarrantyInformation());
        product.setShippingInformation(request.getShippingInformation());
        return productRepository.save(product);
    }

    public void delete(Long id) {
        productRepository.deleteById(id);
    }

    public BigDecimal getMaxPrice() {
        BigDecimal max = productRepository.findMaxPrice();
        return max != null ? max : BigDecimal.ZERO;
    }
}
