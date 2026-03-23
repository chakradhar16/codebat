package com.example.finalcodemat.models;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "day_progress")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
public class DayProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // JOIN WITH USERS TABLE
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private Integer dayNumber;

    private Boolean completed;

    private LocalDate completedDate;
}
