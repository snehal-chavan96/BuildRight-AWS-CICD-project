package com.buildright.service;

import com.buildright.entity.ArchitecturalPlan;
import com.buildright.repository.ArchitecturalPlanRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;

@Service
public class ArchitecturalPlanService {

    private final ArchitecturalPlanRepository repository;
    private final S3Service s3Service;

    public ArchitecturalPlanService(ArchitecturalPlanRepository repository, S3Service s3Service) {
        this.repository = repository;
        this.s3Service = s3Service;
    }

    public List<ArchitecturalPlan> getAllPlans() {
        return repository.findAll();
    }

    public ArchitecturalPlan createPlan(String title, String description, MultipartFile image) {
        ArchitecturalPlan plan = new ArchitecturalPlan();
        plan.setTitle(title.trim());
        plan.setDescription(description.trim());

        try {
            if (image != null && !image.isEmpty()) {
                String url = s3Service.uploadFile("plans", image);
                plan.setImageUrl(url);
            } else {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Image is required");
            }

        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to upload image", e);
        }

        return repository.save(plan);
    }

    public void deletePlan(Long id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Plan not found");
        }
        repository.deleteById(id);
    }
}
