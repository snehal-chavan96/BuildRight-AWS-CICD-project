package com.buildright.dto;

import com.buildright.entity.Inquiry;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InquiryResponse {
    private Long id;
    private String name;
    private String email;
    private String type;
    private String budget;
    private String phone;
    private String location;
    private String plotArea;
    private String constructionArea;
    private String timeline;
    private String message;
    private String status;

    public InquiryResponse(Inquiry inquiry) {
        this.id = inquiry.getId();
        this.name = inquiry.getName();
        this.email = inquiry.getEmail();
        this.type = inquiry.getType();
        this.budget = inquiry.getBudget();
        this.phone = inquiry.getPhone();
        this.location = inquiry.getLocation();
        this.plotArea = inquiry.getPlotArea();
        this.constructionArea = inquiry.getConstructionArea();
        this.timeline = inquiry.getTimeline();
        this.message = inquiry.getMessage();
        this.status = inquiry.getStatus();
    }
}
