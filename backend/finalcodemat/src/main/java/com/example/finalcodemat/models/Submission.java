package com.example.finalcodemat.models;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

import com.example.finalcodemat.models.Problem;

@Entity
@Table(name = "submissions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Submission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private boolean allPassed;

    private LocalDateTime submittedAt=LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "problem_id")
    private Problem problem;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String verdict; 
    private String output;
    private Double execTime;

}
