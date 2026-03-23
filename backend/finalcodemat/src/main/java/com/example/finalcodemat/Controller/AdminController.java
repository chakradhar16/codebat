package com.example.finalcodemat.Controller;

import com.example.finalcodemat.models.User;
import com.example.finalcodemat.Repository.UserRepository;
import com.example.finalcodemat.enums.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
@CrossOrigin
@RequiredArgsConstructor
public class AdminController {

    private final UserRepository userRepo;

    @GetMapping
    public List<User> getUsers() {
        return userRepo.findAll();
    }

    @PutMapping("/promote/{id}")
    public String promoteUser(@PathVariable Long id) {
        User u = userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (Boolean.TRUE.equals(u.getBlocked())) {
            throw new RuntimeException("Cannot promote a blocked user");
        }

        u.setRole(Role.ADMIN);
        userRepo.save(u);
        return "User promoted to ADMIN";
    }

    @PutMapping("/demote/{id}")
    public String demoteUser(@PathVariable Long id) {
        User u = userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (u.getRole() == Role.USER) {
            return "User is already USER";
        }

        u.setRole(Role.USER);
        userRepo.save(u);
        return "Admin demoted to USER";
    }

    @PutMapping("/block/{id}")
    public String blockUser(@PathVariable Long id) {
        User u = userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        u.setBlocked(true);
        userRepo.save(u);
        return "User blocked";
    }

    @PutMapping("/unblock/{id}")
    public String unblockUser(@PathVariable Long id) {
        User u = userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        u.setBlocked(false);
        userRepo.save(u);
        return "User unblocked";
    }
}
