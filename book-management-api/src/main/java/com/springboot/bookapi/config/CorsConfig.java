package com.springboot.bookapi.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Value("${app.cors.allowed-origins:http://localhost:3000}")
    private String allowedOrigins;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // 1. 기본적으로 허용할 오리진 리스트 생성 (로컬 및 하드코딩 배포 주소)
        List<String> origins = new ArrayList<>();
        origins.add("http://localhost:3000");
        origins.add("https://www.hjp7208.site");

        // 2. Elastic Beanstalk 등 외부 환경 변수로 들어온 주소가 있다면 리스트에 추가
        if (allowedOrigins != null && !allowedOrigins.trim().isEmpty()) {
            for (String origin : allowedOrigins.split(",")) {
                origins.add(origin.trim()); // 공백 제거 후 추가
            }
        }

        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
