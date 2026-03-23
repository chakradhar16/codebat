package com.example.finalcodemat.Service;

import com.example.finalcodemat.models.Problem;
import com.example.finalcodemat.models.TestCase;
import com.example.finalcodemat.Repository.ProblemRepository;
import com.example.finalcodemat.Repository.TestCaseRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestCaseService {

    private final TestCaseRepository repo;
    private final ProblemRepository problemRepo;

    public TestCaseService(TestCaseRepository repo, ProblemRepository problemRepo) {
        this.repo = repo;
        this.problemRepo = problemRepo;
    }

    public TestCase addTestCase(TestCase testCase, Long problemId) {
        Problem problem = problemRepo.findById(problemId)
                .orElseThrow(() -> new RuntimeException("Problem not found"));

        testCase.setProblem(problem);
        return repo.save(testCase);
    }

    public List<TestCase> getTestCasesByProblem(Long problemId) {
        return repo.findByProblemId(problemId);
    }
    public TestCase updateTestCase(Long testId, TestCase updated) {
        TestCase existing = repo.findById(testId)
                .orElseThrow(() -> new RuntimeException("Testcase not found"));

        existing.setInput(updated.getInput());
        existing.setExpectedOutput(updated.getExpectedOutput());

        return repo.save(existing);
    }

    public void deleteTestCase(Long testId) {
        repo.deleteById(testId);
    }

}
