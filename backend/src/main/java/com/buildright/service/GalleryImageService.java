package com.buildright.service;

import com.buildright.entity.GalleryImage;
import com.buildright.repository.GalleryImageRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class GalleryImageService {

    private final GalleryImageRepository repository;
    private final S3Service s3Service;

    public GalleryImageService(GalleryImageRepository repository, S3Service s3Service) {
        this.repository = repository;
        this.s3Service = s3Service;
    }

    public List<GalleryImage> getAllImages() {
        return repository.findAll();
    }

    public List<GalleryImage> uploadImages(List<MultipartFile> files) {
        List<GalleryImage> savedImages = new ArrayList<>();
        
        try {
            for (MultipartFile file : files) {
                if (file != null && !file.isEmpty()) {
                    String url = s3Service.uploadFile("gallery", file);
                    
                    GalleryImage image = new GalleryImage();
                    image.setImageUrl(url);
                    savedImages.add(repository.save(image));
                }
            }

        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to upload images", e);
        }

        return savedImages;
    }

    public void deleteImage(Long id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Image not found");
        }
        repository.deleteById(id);
    }
}
