package com.example.finalcodemat.Repository;

import com.example.finalcodemat.models.DayProgress;
import com.example.finalcodemat.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface DayProgressRepository extends JpaRepository<DayProgress, Long> {

    List<DayProgress> findByUser(User user);

    List<DayProgress> findByUserAndCompletedTrue(User user);

    Optional<DayProgress> findByUserAndDayNumber(User user, Integer dayNumber);

    List<DayProgress> findByUserAndCompletedTrueOrderByCompletedDateAsc(User user);

    long countByUserAndCompletedTrue(User user);

    long countByUserAndCompletedDate(User user, LocalDate date);
}
