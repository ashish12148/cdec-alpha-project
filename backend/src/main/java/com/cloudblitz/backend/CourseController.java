package com.cloudblitz.backend;

import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CourseController {

    @GetMapping("/api/courses")
    public List<Map<String, Object>> getCourses() {

        return List.of(
            Map.of("id", 1, "name", "AWS Cloud Fundamentals", "category", "Cloud"),
            Map.of("id", 2, "name", "Docker & Containers", "category", "DevOps"),
            Map.of("id", 3, "name", "Kubernetes Essentials", "category", "DevOps"),
            Map.of("id", 4, "name", "Terraform & AWS", "category", "Cloud"),
            Map.of("id", 5, "name", "CI/CD with Jenkins", "category", "DevOps")
        );
    }
}
