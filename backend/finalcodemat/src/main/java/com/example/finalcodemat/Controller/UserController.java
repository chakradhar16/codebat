package com.example.finalcodemat.Controller;

import com.example.finalcodemat.DTO.ChangePasswordRequest;
import com.example.finalcodemat.Repository.UserRepository;
import com.example.finalcodemat.models.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin
public class UserController {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    // =========================
    // GET LOGGED-IN USER PROFILE
    // =========================
    @GetMapping("/me")
    public User getMyProfile() {
        return getCurrentUser();
    }

    // =========================
    // UPDATE PROFILE
    // =========================
    @PutMapping("/me")
    public User updateMyProfile(@RequestBody User updated) {
        User user = getCurrentUser();

        if (user.getBlocked()) {
            throw new RuntimeException("User account is blocked");
        }

        user.setFullName(updated.getFullName());
        user.setPhone(updated.getPhone());

        return userRepository.save(user);
    }

    // =========================
    // UPDATE NOTIFICATIONS
    // =========================
    @PutMapping("/me/notifications")
    public User updateNotifications(@RequestBody User updated) {
        User user = getCurrentUser();

        if (user.getBlocked()) {
            throw new RuntimeException("User account is blocked");
        }

        user.setEmailNotifications(updated.getEmailNotifications());
        user.setPushNotifications(updated.getPushNotifications());
        user.setSmsNotifications(updated.getSmsNotifications());

        return userRepository.save(user);
    }

    // =========================
    // CHANGE PASSWORD
    // =========================
    @PutMapping("/change-password")
    public String changePassword(@RequestBody ChangePasswordRequest req) {

        User user = getCurrentUser();

        if (user.getBlocked()) {
            throw new RuntimeException("User account is blocked");
        }

        if (!passwordEncoder.matches(req.getCurrentPassword(), user.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(req.getNewPassword()));
        userRepository.save(user);

        return "Password changed successfully";
    }

    // =========================
    // SUCCESS STREAK (DASHBOARD)
    // =========================
    @GetMapping("/me/streak")
    public int getMySuccessStreak() {
        return getCurrentUser().getSuccessStreak();
    }

    // =========================
    // BLOCK STATUS (OPTIONAL UI)
    // =========================
    @GetMapping("/me/status")
    public Boolean isBlocked() {
        return getCurrentUser().getBlocked();
    }

    // =========================
    // INTERNAL: GET AUTH USER
    // =========================
    private User getCurrentUser() {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Authenticated user not found"));
    }
}
