package com.forgex.backend.controller;

import com.forgex.backend.entity.QuoteRequest;
import com.forgex.backend.service.QuoteRequestService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
}