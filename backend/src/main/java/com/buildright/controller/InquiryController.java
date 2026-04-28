package com.buildright.controller;

import com.buildright.dto.InquiryRequest;
import com.buildright.dto.InquiryResponse;
import com.buildright.service.InquiryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/inquiries")
public class InquiryController {
    
    private final InquiryService inquiryService;

    public InquiryController(InquiryService inquiryService) {
        this.inquiryService = inquiryService;
    }

    @PostMapping
    public ResponseEntity<InquiryResponse> createInquiry(@RequestBody InquiryRequest request) {
        return ResponseEntity.ok(inquiryService.createInquiry(request));
    }

    @GetMapping("/my")
    public ResponseEntity<List<InquiryResponse>> getMyInquiries() {
        return ResponseEntity.ok(inquiryService.getUserInquiries());
    }

    @GetMapping
    public ResponseEntity<List<InquiryResponse>> getAllInquiries() {
        return ResponseEntity.ok(inquiryService.getAllInquiries());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<InquiryResponse> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(inquiryService.updateInquiryStatus(id, body.get("status")));
    }
}
