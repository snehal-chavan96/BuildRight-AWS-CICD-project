package com.buildright.service;

import com.buildright.dto.ProjectRequest;
import com.buildright.entity.Project;
import com.buildright.repository.ProjectRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final S3Service s3Service;

    public ProjectService(ProjectRepository projectRepository, S3Service s3Service) {
        this.projectRepository = projectRepository;
        this.s3Service = s3Service;
    }

    public Project createProject(ProjectRequest request) {
        Project project = new Project();
        project.setTitle(request.getTitle().trim());
        project.setDescription(request.getDescription().trim());
        project.setLocation(request.getLocation().trim());
        project.setDate(request.getDate().trim());
        project.setBudget(request.getBudget() != null ? request.getBudget().trim() : "");
        project.setArea(request.getArea() != null ? request.getArea().trim() : "");
        project.setYear(request.getYear() != null ? request.getYear().trim() : "");

        try {
            if (request.getImage() != null && !request.getImage().isEmpty()) {
                String url = s3Service.uploadFile("projects", request.getImage());
                project.setImageUrl(url);
            } else {
                project.setImageUrl("");
            }

            if (request.getAdditionalImages() != null) {
                for (org.springframework.web.multipart.MultipartFile file : request.getAdditionalImages()) {
                    if (file != null && !file.isEmpty()) {
                        String url = s3Service.uploadFile("projects", file);
                        project.getAdditionalImages().add(url);
                    }
                }
            }

            if (request.getPdf() != null && !request.getPdf().isEmpty()) {
                String url = s3Service.uploadFile("pdfs", request.getPdf());
                project.setPdfUrl(url);
            } else {
                project.setPdfUrl("");
            }
        } catch (java.io.IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to store files: " + e.getMessage(), e);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error: " + e.getMessage(), e);
        }
        return projectRepository.save(project);
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Project getProjectById(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Project not found"));
    }

    public void deleteProject(Long id) {
        if (!projectRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Project not found");
        }
        projectRepository.deleteById(id);
    }
}
