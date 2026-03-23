package com.example.finalcodemat.Service;

import com.example.finalcodemat.models.Problem;
import com.example.finalcodemat.models.Submission;
import com.example.finalcodemat.models.User;

import jakarta.transaction.Transactional;

import com.example.finalcodemat.Repository.ProblemRepository;
import com.example.finalcodemat.Repository.SubmissionRepository;
import com.example.finalcodemat.Repository.UserRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class SubmissionService {

    private final SubmissionRepository submissionRepo;
    private final UserRepository userRepo;
    private final ProblemRepository problemRepo;

    public SubmissionService(SubmissionRepository submissionRepo,
                             UserRepository userRepo,
                             ProblemRepository problemRepo) {
        this.submissionRepo = submissionRepo;
        this.userRepo = userRepo;
        this.problemRepo = problemRepo;
    }

    public Submission saveSubmission(Long userId, Long problemId,
             boolean allPassed) {

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Problem problem = problemRepo.findById(problemId)
                .orElseThrow(() -> new RuntimeException("Problem not found"));

        Submission submission = new Submission();
        submission.setUser(user);
        submission.setProblem(problem);
        submission.setAllPassed(allPassed);
        submission.setSubmittedAt(LocalDateTime.now());

        Submission saved=submissionRepo.save(submission);
        updateUserStreak(user, allPassed);
         
        return saved;
        
    }

    public List<Submission> getUserSubmissions(Long userId) {
        return submissionRepo.findByUserIdOrderBySubmittedAtDesc(userId);
    }

    public long countSolvedProblems(Long userId) {
        List<Submission> submissions = submissionRepo.findByUserId(userId);

        return submissions.stream()
                .filter(Submission::isAllPassed)
                .map(s -> s.getProblem().getId()) // 👈 problem id
                .distinct()                       // 👈 unique problems
                .count();
    }
    
    @Transactional
    public void updateUserStreak(User user, boolean allPassed) {

        LocalDate today = LocalDate.now();

        // Track activity (used for inactivity detection)
        user.setLastSubmissionDate(today);

        if (allPassed) {
            // ✅ Success counted only once per day
            if (!today.equals(user.getLastSuccessDate())) {
                user.setSuccessStreak(user.getSuccessStreak() + 1);
                user.setLastSuccessDate(today);
            }

            // Reset bad days
            user.setInactiveFailureDays(0);
        }

        userRepo.save(user);
    }



}
