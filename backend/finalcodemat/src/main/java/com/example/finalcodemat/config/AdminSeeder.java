package com.example.finalcodemat.config;

import com.example.finalcodemat.models.User;
import com.example.finalcodemat.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import com.example.finalcodemat.enums.Role;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AdminSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {

        String adminEmail = "admin@codingmate.com";

        if (userRepository.findByEmail(adminEmail).isEmpty()) {

            User admin = new User();
            admin.setEmail(adminEmail);
            admin.setUsername("admin");
            admin.setFullName("CodingMate Admin");
            admin.setPassword(passwordEncoder.encode("Admin@123"));
            admin.setRole(Role.ADMIN);
            admin.setBlocked(false);

            userRepository.save(admin);

            System.out.println("✅ Default admin created");
        } else {
            System.out.println("ℹ️ Admin already exists");
        }
    }
}
