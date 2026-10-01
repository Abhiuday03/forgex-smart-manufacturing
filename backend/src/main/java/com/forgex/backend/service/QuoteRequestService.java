package com.forgex.backend.service;

import com.forgex.backend.entity.QuoteRequest;
import com.forgex.backend.repository.QuoteRequestRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuoteRequestService {

    private final QuoteRequestRepository repository;

    public QuoteRequestService(
            QuoteRequestRepository repository
    ) {
        this.repository = repository;
    }

    public QuoteRequest createQuoteRequest(
            QuoteRequest quoteRequest
    ) {
        return repository.save(quoteRequest);
    }

    public List<QuoteRequest> getAllQuoteRequests() {
        return repository.findAll();
    }

    public QuoteRequest updateStatus(
            Long id,
            String status
    ) {

        QuoteRequest quoteRequest = repository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Quote request not found with id: " + id
                        )
                );

        quoteRequest.setStatus(status);

        return repository.save(quoteRequest);
    }
}