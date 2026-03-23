package com.example.finalcodemat.config;

import com.example.finalcodemat.Repository.UserRepository;
import com.example.finalcodemat.enums.Role;
import com.example.finalcodemat.models.User;
import jakarta.transaction.Transactional;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class UserActivityScheduler {

    private final UserRepository userRepo;

    public UserActivityScheduler(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    // Runs every day at 12:05 AM
    //@Scheduled(cron = "0 */1 * * * *")

    @Scheduled(cron = "0 5 0 * * *")
    @Transactional
    public void evaluateUserActivity() {

        LocalDate yesterday = LocalDate.now().minusDays(1);

        List<User> users = userRepo.findByBlockedFalse();

        for (User user : users) {

            boolean noSubmission =
                user.getLastSubmissionDate() == null ||
                user.getLastSubmissionDate().isBefore(yesterday);

            boolean noSuccess =
                user.getLastSuccessDate() == null ||
                user.getLastSuccessDate().isBefore(yesterday);

            if (noSubmission || noSuccess) {
                user.setInactiveFailureDays(user.getInactiveFailureDays() + 1);
            } else {
                user.setInactiveFailureDays(0);
            }

            if (user.getInactiveFailureDays() >= 3 && user.getRole() == Role.USER) {
                user.setBlocked(true);
            }
        }

        userRepo.saveAll(users);
    }
}
