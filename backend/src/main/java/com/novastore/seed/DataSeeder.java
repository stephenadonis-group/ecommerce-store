package com.novastore.seed;

import com.novastore.product.Product;
import com.novastore.product.ProductRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final ProductRepository productRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void run(String... args) {
        if (productRepository.count() > 0) {
            log.info("Products already seeded, skipping");
            return;
        }
        log.info("Seeding products from dummyjson...");
        RestTemplate restTemplate = new RestTemplate();
        try {
            String json = restTemplate.getForObject("https://dummyjson.com/products?limit=0", String.class);
            JsonNode root = objectMapper.readTree(json);
            JsonNode products = root.get("products");

            List<Product> entities = new ArrayList<>();
            for (JsonNode p : products) {
                List<String> images = new ArrayList<>();
                if (p.has("images")) {
                    p.get("images").forEach(img -> images.add(img.asText()));
                }

                entities.add(Product.builder()
                        .title(p.get("title").asText())
                        .description(p.get("description").asText())
                        .price(new BigDecimal(p.get("price").asText()))
                        .discountPercentage(new BigDecimal(p.get("discountPercentage").asText()))
                        .rating(p.get("rating").asDouble())
                        .stock(p.get("stock").asInt())
                        .brand(p.has("brand") && !p.get("brand").isNull() ? p.get("brand").asText() : null)
                        .category(p.get("category").asText())
                        .thumbnail(p.get("thumbnail").asText())
                        .images(images)
                        .warrantyInformation(p.has("warrantyInformation") ? p.get("warrantyInformation").asText() : null)
                        .shippingInformation(p.has("shippingInformation") ? p.get("shippingInformation").asText() : null)
                        .build());
            }
            productRepository.saveAll(entities);
            log.info("Seeded {} products", entities.size());
        } catch (Exception e) {
            log.error("Failed to seed products", e);
        }
    }
}
