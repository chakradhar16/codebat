package com.example.finalcodemat.Repository;


import com.example.finalcodemat.models.Problem;
import com.example.finalcodemat.models.Submission;
import com.example.finalcodemat.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {

    List<Submission> findByUserId(Long userId);
    List<Submission> findByUser(User user);

    List<Submission> findByProblem(Problem problem);

    List<Submission> findByUserAndProblem(User user, Problem problem);

    Optional<Submission> findTopByUserAndProblemOrderBySubmittedAtDesc(User user, Problem problem);

    long countByUserAndAllPassedTrue(User user);
	List<Submission> findByUserIdOrderBySubmittedAtDesc(Long userId);
}

