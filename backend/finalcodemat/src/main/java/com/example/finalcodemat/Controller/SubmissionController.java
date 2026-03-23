package com.example.finalcodemat.Controller;

import com.example.finalcodemat.Service.SubmissionService;
import com.example.finalcodemat.Repository.UserRepository;
import com.example.finalcodemat.models.Submission;
import com.example.finalcodemat.models.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/submissions")
@CrossOrigin
@RequiredArgsConstructor
public class SubmissionController {

    private final SubmissionService submissionService;
    private final UserRepository userRepository;

    // ✅ USER dashboard endpoint
    @GetMapping("/my")
    public List<Submission> getMySubmissions() {
        User current = getCurrentUser();

        if (current.getBlocked()) {
            throw new RuntimeException("User account is blocked");
        }

        return submissionService.getUserSubmissions(current.getId());
    }

    // ✅ ADMIN / internal use endpoint
    @GetMapping("/user/{userId}")
    public List<Submission> getUserSubmissionsByAdmin(@PathVariable Long userId) {
        return submissionService.getUserSubmissions(userId);
    }

    private User getCurrentUser() {
        Authentication auth =
                SecurityContextHolder.getContext().getAuthentication();

        System.out.println("AUTH = " + auth);
        System.out.println("AUTHORITIES = " + auth.getAuthorities());

        String email = auth.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Authenticated user not found"));
    }
    
    @GetMapping("/my/solved-count")
    public long getMySolvedCount() {
        User current = getCurrentUser();
        return submissionService.countSolvedProblems(current.getId());
    }

}
