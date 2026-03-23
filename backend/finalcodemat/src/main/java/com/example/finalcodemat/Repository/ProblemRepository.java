package com.example.finalcodemat.Repository;

import com.example.finalcodemat.models.Problem;
import com.example.finalcodemat.enums.Difficulty;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProblemRepository extends JpaRepository<Problem, Long> {

    List<Problem> findByDifficulty(Difficulty difficulty);

    List<Problem> findByDayNumber(Integer dayNumber);
    
    List<Problem> findByDayNumber(int dayNumber);

}
