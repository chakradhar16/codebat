package com.example.finalcodemat.Service;

import com.example.finalcodemat.DTO.RegisterRequest;
import com.example.finalcodemat.enums.Role;
import com.example.finalcodemat.models.User;
import com.example.finalcodemat.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository repo;
    private final PasswordEncoder encoder;
    private final JWTService jwtService;

    // REGISTER
    public User register(RegisterRequest req) {

        if (repo.existsByUsername(req.getUsername())) {
            throw new IllegalArgumentException("Username already taken");
        }

        if (repo.existsByEmail(req.getEmail())) {
            throw new IllegalArgumentException("Email already in use");
        }

        User user = new User();
        user.setUsername(req.getUsername());
        user.setEmail(req.getEmail());
        user.setPassword(encoder.encode(req.getPassword()));
        user.setRole(req.getRole());
        user.setFullName(req.getFullName());
        user.setPhone(req.getPhone());
        user.setBlocked(false);

        return repo.save(user);
    }

    // LOGIN
    public String login(String email, String rawPassword) {
        User user = repo.findByEmail(email)
                .orElseThrow(() -> new BadCredentialsException("Invalid email or password"));

        if (Boolean.TRUE.equals(user.getBlocked())) {
            throw new BadCredentialsException("Account is blocked");
        }

        if (!encoder.matches(rawPassword, user.getPassword())) {
            throw new BadCredentialsException("Invalid email or password");
        }

        return jwtService.generateToken(
                new org.springframework.security.core.userdetails.User(
                        user.getEmail(),
                        user.getPassword(),
                        java.util.List.of(
                                new org.springframework.security.core.authority.SimpleGrantedAuthority(
                                        "ROLE_" + user.getRole().name()
                                )
                        )
                ),
                user.getRole().name()
        );
    }

    // ADMIN LOGIN
    public String adminLogin(String email, String rawPassword) {
        User user = repo.findByEmail(email)
                .orElseThrow(() -> new BadCredentialsException("Invalid admin credentials"));

        if (!Role.ADMIN.equals(user.getRole())) {
            throw new BadCredentialsException("Not authorized");
        }

        if (Boolean.TRUE.equals(user.getBlocked())) {
            throw new BadCredentialsException("Admin account blocked");
        }

        if (!encoder.matches(rawPassword, user.getPassword())) {
            throw new BadCredentialsException("Invalid admin credentials");
        }

        return jwtService.generateToken(
                new org.springframework.security.core.userdetails.User(
                        user.getEmail(),
                        user.getPassword(),
                        java.util.List.of(
                                new org.springframework.security.core.authority.SimpleGrantedAuthority(
                                        "ROLE_ADMIN"
                                )
                        )
                ),
                user.getRole().name()
        );
    }
}
