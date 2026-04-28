package com.buildright.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InquiryRequest {
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
}
