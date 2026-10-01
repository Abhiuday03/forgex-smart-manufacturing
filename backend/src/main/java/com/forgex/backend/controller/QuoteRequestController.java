package com.forgex.backend.controller;

import com.forgex.backend.entity.QuoteRequest;
import com.forgex.backend.service.QuoteRequestService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/quotes")
@CrossOrigin(origins = "http://localhost:5173")
public class QuoteRequestController {

    private final QuoteRequestService service;

    public QuoteRequestController(
            QuoteRequestService service
    ) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<QuoteRequest> createQuote(
            @RequestBody QuoteRequest quoteRequest
    ) {

        QuoteRequest savedQuote =
                service.createQuoteRequest(quoteRequest);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedQuote);
    }

    @GetMapping
    public ResponseEntity<List<QuoteRequest>> getAllQuotes() {

        return ResponseEntity.ok(
                service.getAllQuoteRequests()
        );
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<QuoteRequest> updateStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> request
    ) {

        String status = request.get("status");

        if (status == null || status.isBlank()) {
            return ResponseEntity.badRequest().build();
        }

        QuoteRequest updatedQuote =
                service.updateStatus(id, status);

        return ResponseEntity.ok(updatedQuote);
    }
}