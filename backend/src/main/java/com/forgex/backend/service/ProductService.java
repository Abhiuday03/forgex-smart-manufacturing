package com.forgex.backend.service;

import com.forgex.backend.entity.Product;
import com.forgex.backend.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository repository;

    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    public List<Product> getAllProducts() {
        return repository.findAll();
    }

    public Product getProductBySlug(String slug) {
        return repository.findBySlug(slug)
                .orElseThrow(() ->
                        new RuntimeException("Product not found: " + slug)
                );
    }

    public Product createProduct(Product product) {
        return repository.save(product);
    }
}