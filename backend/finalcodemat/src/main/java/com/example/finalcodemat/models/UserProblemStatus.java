package com.example.finalcodemat.models;

import com.example.finalcodemat.models.Problem;

import jakarta.persistence.*;

@Entity
@Table(name = "user_problem_status")
public class UserProblemStatus {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne private User user;
    @ManyToOne
    private Problem problem;

    private Boolean solved;
}

