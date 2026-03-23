package com.example.finalcodemat.Service;

import com.example.finalcodemat.models.DayProgress;
import com.example.finalcodemat.models.User;
import com.example.finalcodemat.Repository.DayProgressRepository;
import com.example.finalcodemat.Repository.UserRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class DayProgressService {

    private final DayProgressRepository repo;
    private final UserRepository userRepo;

    public DayProgressService(DayProgressRepository repo, UserRepository userRepo) {
        this.repo = repo;
        this.userRepo = userRepo;
    }

    public DayProgress markCompleted(Long userId, Integer day) {
        User user = userRepo.findById(userId).orElseThrow();

        return repo.findByUserAndDayNumber(user, day)
                .map(existing -> {
                    existing.setCompleted(true);
                    existing.setCompletedDate(LocalDate.now());
                    return repo.save(existing);
                })
                .orElseGet(() -> {
                    DayProgress dp = new DayProgress();
                    dp.setUser(user);
                    dp.setDayNumber(day);
                    dp.setCompleted(true);
                    dp.setCompletedDate(LocalDate.now());
                    return repo.save(dp);
                });
    }

    public List<DayProgress> getCompletedDays(Long userId) {
        User user = userRepo.findById(userId).orElseThrow();
        return repo.findByUserAndCompletedTrue(user);
    }

    public long countCompleted(Long userId) {
        User user = userRepo.findById(userId).orElseThrow();
        return repo.countByUserAndCompletedTrue(user);
    }
}
