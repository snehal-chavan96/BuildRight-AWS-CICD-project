package com.buildright.controller;

import com.buildright.entity.ArchitecturalPlan;
import com.buildright.service.ArchitecturalPlanService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/plans")
public class ArchitecturalPlanController {

    private final ArchitecturalPlanService service;

    public ArchitecturalPlanController(ArchitecturalPlanService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<ArchitecturalPlan>> getAllPlans() {
        return ResponseEntity.ok(service.getAllPlans());
    }

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<ArchitecturalPlan> createPlan(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("image") MultipartFile image) {
        ArchitecturalPlan plan = service.createPlan(title, description, image);
        return ResponseEntity.status(HttpStatus.CREATED).body(plan);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deletePlan(@PathVariable Long id) {
        service.deletePlan(id);
        return ResponseEntity.ok(Map.of("message", "Plan deleted successfully"));
    }
}
