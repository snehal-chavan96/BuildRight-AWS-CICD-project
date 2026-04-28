package com.buildright.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

@Configuration
public class S3Config {

    @Value("${AWS_REGION}")
    private String region;

    @Bean
    public S3Client s3Client() {
        // Using IAM Role attached to EC2 for authentication (no access keys required)
        // For local development, AWS credentials can be provided via environment variables or AWS CLI
        return S3Client.builder()
                .region(Region.of(region))
                .build();
    }
}
