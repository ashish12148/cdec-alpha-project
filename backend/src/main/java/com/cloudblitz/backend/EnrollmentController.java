 package com.cloudblitz.backend;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/enrollments")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "http://localhost:5176",
    "http://localhost:5177"
})
public class EnrollmentController {

    private final EnrollmentRepository enrollmentRepository;

    public EnrollmentController(EnrollmentRepository enrollmentRepository) {
        this.enrollmentRepository = enrollmentRepository;
    }

    @PostMapping
    public Enrollment enroll(@RequestBody Map<String, String> request) {

        String name = request.get("name");
        String email = request.get("email");
        String course = request.get("course");

        if (name == null || name.isBlank()
                || email == null || email.isBlank()
                || course == null || course.isBlank()) {

            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Name, email and course are required"
            );
        }

        Enrollment enrollment = new Enrollment(
            name.trim(),
            email.trim(),
            course.trim()
        );

        return enrollmentRepository.save(enrollment);
    }

    @GetMapping
    public List<Enrollment> getEnrollments() {
        return enrollmentRepository.findAll();
    }
}