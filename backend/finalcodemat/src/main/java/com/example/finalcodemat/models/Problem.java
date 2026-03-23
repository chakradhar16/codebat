package com.example.finalcodemat.models;

import com.example.finalcodemat.enums.Difficulty;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "problems")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Problem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(columnDefinition = "TEXT")
    private String Category;

    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;

    @Column(columnDefinition = "TEXT")
    private String sampleInput;

    @Column(columnDefinition = "TEXT")
    private String sampleOutput;

    /**
     * SECURITY CRITICAL:
     * Never serialize hidden testcases to users.
     * Admins manage them via TestCaseController only.
     */
    @OneToMany(
    	    mappedBy = "problem",
    	    cascade = CascadeType.ALL,
    	    orphanRemoval = true
    	)
    	@JsonManagedReference
    	private List<TestCase> testCases;


    private Integer dayNumber;
}
