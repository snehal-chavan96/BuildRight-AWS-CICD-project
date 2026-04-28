package com.buildright.service;

import com.buildright.dto.InquiryRequest;
import com.buildright.dto.InquiryResponse;
import com.buildright.entity.Inquiry;
import com.buildright.entity.User;
import com.buildright.repository.InquiryRepository;
import com.buildright.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InquiryService {

    private final InquiryRepository inquiryRepository;
    private final UserRepository userRepository;

    public InquiryService(InquiryRepository inquiryRepository, UserRepository userRepository) {
        this.inquiryRepository = inquiryRepository;
        this.userRepository = userRepository;
    }

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public InquiryResponse createInquiry(InquiryRequest request) {
        User user = getCurrentUser();
        Inquiry inquiry = new Inquiry();
        inquiry.setUser(user);
        inquiry.setName(request.getName());
        inquiry.setEmail(request.getEmail());
        inquiry.setType(request.getType());
        inquiry.setBudget(request.getBudget());
        inquiry.setPhone(request.getPhone());
        inquiry.setLocation(request.getLocation());
        inquiry.setPlotArea(request.getPlotArea());
        inquiry.setConstructionArea(request.getConstructionArea());
        inquiry.setTimeline(request.getTimeline());
        inquiry.setMessage(request.getMessage());
        inquiry.setStatus("Pending");
        
        inquiryRepository.save(inquiry);
        return new InquiryResponse(inquiry);
    }

    public List<InquiryResponse> getUserInquiries() {
        User user = getCurrentUser();
        return inquiryRepository.findByUserId(user.getId())
                .stream()
                .map(InquiryResponse::new)
                .collect(Collectors.toList());
    }

    public List<InquiryResponse> getAllInquiries() {
        return inquiryRepository.findAll()
                .stream()
                .map(InquiryResponse::new)
                .collect(Collectors.toList());
    }

    public InquiryResponse updateInquiryStatus(Long id, String status) {
        Inquiry inquiry = inquiryRepository.findById(id).orElseThrow(() -> new RuntimeException("Inquiry not found"));
        inquiry.setStatus(status);
        inquiryRepository.save(inquiry);
        return new InquiryResponse(inquiry);
    }
}
