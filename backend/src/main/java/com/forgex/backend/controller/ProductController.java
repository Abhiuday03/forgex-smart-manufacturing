package com.forgex.backend.controller;

import com.forgex.backend.entity.Product;
import com.forgex.backend.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {

        return ResponseEntity.ok(
                service.getAllProducts()
        );
    }

    @GetMapping("/{slug}")
    public ResponseEntity<Product> getProductBySlug(
            @PathVariable String slug
    ) {

        return ResponseEntity.ok(
                service.getProductBySlug(slug)
        );
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(
            @RequestBody Product product
    ) {

        return ResponseEntity.ok(
                service.createProduct(product)
        );
    }
}