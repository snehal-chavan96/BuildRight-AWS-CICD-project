package com.buildright.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.CollectionTable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Lob
    @Column(nullable = false, columnDefinition = "LONGTEXT")
    private String description;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    private String date;

    @Column
    private String budget;

    @Column
    private String area;

    @Column
    private String year;

    @Column(nullable = false, length = 2048)
    private String imageUrl; // Cover image

    @ElementCollection
    @CollectionTable(name = "project_images", joinColumns = @jakarta.persistence.JoinColumn(name = "project_id"))
    @Column(name = "image_url", length = 2048)
    private java.util.List<String> additionalImages = new java.util.ArrayList<>();

    @Column(nullable = false, length = 2048)
    private String pdfUrl;
}
