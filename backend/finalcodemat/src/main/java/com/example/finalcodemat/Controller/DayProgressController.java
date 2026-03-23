package com.example.finalcodemat.Controller;

import com.example.finalcodemat.Service.DayProgressService;
import com.example.finalcodemat.Repository.UserRepository;
import com.example.finalcodemat.models.DayProgress;
import com.example.finalcodemat.models.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/day-progress")
@CrossOrigin
@RequiredArgsConstructor
public class DayProgressController {

    private final DayProgressService service;
    private final UserRepository userRepository;

    // ============================
    // ✅ USER ENDPOINTS
    // ============================

    // COMPLETE A DAY (USER)
    @PostMapping("/complete/{userId}/{day}")
    public DayProgress markDayCompleted(
            @PathVariable Long userId,
            @PathVariable Integer day
    ) {
        User current = getCurrentUser();

        if (current.getBlocked()) {
            throw new RuntimeException("User account is blocked");
        }

        // ignore URL userId → always use logged-in user
        return service.markCompleted(current.getId(), day);
    }

    // LIST COMPLETED DAYS (USER)
    @GetMapping("/completed/{userId}")
    public List<DayProgress> getCompletedDays(@PathVariable Long userId) {
        User current = getCurrentUser();

        if (current.getBlocked()) {
            throw new RuntimeException("User account is blocked");
        }

        return service.getCompletedDays(current.getId());
    }

    // ✅ COUNT COMPLETED DAYS (USER DASHBOARD)
    @GetMapping("/my/count")
    public long getMyCompletedCount() {
        User current = getCurrentUser();

        if (current.getBlocked()) {
            throw new RuntimeException("User account is blocked");
        }

        return service.countCompleted(current.getId());
    }

    // ============================
    // 🔐 COMMON METHOD
    // ============================

    private User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        System.out.println("AUTH = " + auth);
        System.out.println("AUTHORITIES = " + auth.getAuthorities());

        String email = auth.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Authenticated user not found"));
    }
}
