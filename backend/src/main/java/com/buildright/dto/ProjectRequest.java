package com.buildright.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.URL;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectRequest {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Description is required")
    @Size(min = 10, message = "Description must be at least 10 characters")
    private String description;

    @NotBlank(message = "Location is required")
    private String location;

    @NotBlank(message = "Date is required")
    private String date;

    private String budget;
    private String area;
    private String year;

    private org.springframework.web.multipart.MultipartFile image;

    private java.util.List<org.springframework.web.multipart.MultipartFile> additionalImages;

    private org.springframework.web.multipart.MultipartFile pdf;
}
