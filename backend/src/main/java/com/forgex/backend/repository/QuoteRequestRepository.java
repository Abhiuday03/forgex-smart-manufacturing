package com.forgex.backend.repository;

import com.forgex.backend.entity.QuoteRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuoteRequestRepository
        extends JpaRepository<QuoteRequest, Long> {
}