package com.example.finalcodemat.Controller;

import com.example.finalcodemat.Repository.UserRepository;
import com.example.finalcodemat.Service.CodeEvaluationService;
import com.example.finalcodemat.models.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/code")
@CrossOrigin
@RequiredArgsConstructor
public class CodeEvaluationController {

    private final CodeEvaluationService service;
    private final UserRepository userRepository;

    @PostMapping("/submit")
    public Map<String, Object> submit(@RequestBody Map<String, String> req) {

        User current = getCurrentUser();

        if (Boolean.TRUE.equals(current.getBlocked())) {
            throw new RuntimeException("User account is blocked");
        }

        // Frontend still sends userId, but we IGNORE it
        Long problemId = Long.valueOf(req.get("problemId"));
        String code = req.get("code");

        if (code == null || code.isBlank()) {
            throw new IllegalArgumentException("Code cannot be empty");
        }

        return service.evaluate(current.getId(), problemId, code);
    }

    private User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Authenticated user not found"));
    }
}
