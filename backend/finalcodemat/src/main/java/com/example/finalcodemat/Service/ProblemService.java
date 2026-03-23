package com.example.finalcodemat.Service;


import com.example.finalcodemat.models.Problem;
import com.example.finalcodemat.models.TestCase;
import com.example.finalcodemat.Repository.ProblemRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProblemService {

    private final ProblemRepository repo;

    public ProblemService(ProblemRepository repo) {
        this.repo = repo;
    }

    public Problem addProblem(Problem problem) {

    	    if (problem.getTestCases() != null) {
    	        for (TestCase tc : problem.getTestCases()) {
    	            tc.setProblem(problem); // 🔗 critical line
    	        }
    	    }

    	    return repo.save(problem);

    }

    public List<Problem> getAllProblems() {
        return repo.findAll();
    }

    public Problem getProblem(Long id) {
        return repo.findById(id).orElse(null);
    }

    // ✅ FIX HERE
    public List<Problem> getProblemsByDay(int day) {
        return repo.findByDayNumber(day);
    }
}
