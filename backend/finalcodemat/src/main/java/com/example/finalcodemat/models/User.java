package com.example.finalcodemat.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

import com.example.finalcodemat.enums.Role;

@Entity
@Table(name = "users",
       uniqueConstraints = {
           @UniqueConstraint(columnNames = "username"),
           @UniqueConstraint(columnNames = "email")
       })
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    private String fullName;
    private String phone;

    private Boolean emailNotifications = true;
    private Boolean smsNotifications = false;
    private Boolean pushNotifications = false;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role = Role.USER;
    
    @Column(nullable = false)
    private Boolean blocked = false;
    
    private int successStreak = 0;          // shown on dashboard
    private int inactiveFailureDays = 0;    // used for blocking

    private LocalDate lastSuccessDate;       // last day with success
    private LocalDate lastSubmissionDate;    // last day user submitted anything


    private LocalDate lastLogin = LocalDate.now();
}
