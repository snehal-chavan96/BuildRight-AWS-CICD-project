package com.buildright.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "inquiries")
public class Inquiry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String type;

    @Column(nullable = false)
    private String budget;

    @Column
    private String phone;

    @Column
    private String location;

    @Column
    private String plotArea;

    @Column
    private String constructionArea;

    @Column
    private String timeline;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String message;

    @Column(nullable = false)
    private String status = "Pending";
}
