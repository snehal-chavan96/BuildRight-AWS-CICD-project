package com.buildright.controller;

import com.buildright.entity.GalleryImage;
import com.buildright.service.GalleryImageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/gallery")
public class GalleryImageController {

    private final GalleryImageService service;

    public GalleryImageController(GalleryImageService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<GalleryImage>> getAllImages() {
        return ResponseEntity.ok(service.getAllImages());
    }

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<List<GalleryImage>> uploadImages(
            @RequestParam("images") List<MultipartFile> images) {
        List<GalleryImage> saved = service.uploadImages(images);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteImage(@PathVariable Long id) {
        service.deleteImage(id);
        return ResponseEntity.ok(Map.of("message", "Image deleted successfully"));
    }
}
