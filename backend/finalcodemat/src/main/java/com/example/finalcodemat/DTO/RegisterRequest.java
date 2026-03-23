package com.example.finalcodemat.DTO;

import com.example.finalcodemat.enums.Role;
import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    private String email;
    private String password;
    private String fullName;
    private String phone;
    private Role role;   
}
