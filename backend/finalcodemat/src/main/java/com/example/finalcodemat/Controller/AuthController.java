package com.example.finalcodemat.Controller;

import com.example.finalcodemat.DTO.LoginRequest;
import com.example.finalcodemat.DTO.RegisterRequest;
import com.example.finalcodemat.Service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
@RequiredArgsConstructor
public class AuthController {

    private final AuthService service;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        try {
            service.register(req);
            return ResponseEntity.ok("User registered successfully");
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.internalServerError()
                    .body("Registration failed");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        try {
            String token = service.login(req.email, req.password);
            return ResponseEntity.ok(new TokenResponse(token));
        } catch (Exception ex) {
            return ResponseEntity.status(401).body("Login failed: " + ex.getMessage());
        }
    }

    @PostMapping("/admin/login")
    public ResponseEntity<?> adminLogin(@RequestBody LoginRequest req) {
        try {
            String token = service.adminLogin(req.email, req.password);
            return ResponseEntity.ok(new TokenResponse(token));
        } catch (Exception ex) {
            return ResponseEntity.status(401).body("Admin login failed: " + ex.getMessage());
        }
    }

    static class TokenResponse {
        public String token;
        public TokenResponse(String token) {
            this.token = token;
        }
    }
}
