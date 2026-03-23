package com.example.finalcodemat.Controller;

import com.example.finalcodemat.models.Problem;
import com.example.finalcodemat.models.TestCase;
import com.example.finalcodemat.Repository.ProblemRepository;
import com.example.finalcodemat.Repository.TestCaseRepository;
import com.example.finalcodemat.Service.ProblemService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/problems")
@CrossOrigin
@RequiredArgsConstructor
public class AdminProblemController {

    private final ProblemRepository problemRepo;
    private final TestCaseRepository testRepo;
    private final ProblemService problemService;

    @PostMapping
    public Problem createProblem(@RequestBody Problem p) {
        return problemService.addProblem(p); // ✅ USE SERVICE
    }
    
    @PutMapping("/{id}")
    public Problem updateProblem(@PathVariable Long id, @RequestBody Problem p) {
        Problem existing = problemRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Problem not found"));

        existing.setTitle(p.getTitle());
        existing.setDescription(p.getDescription());
        existing.setDifficulty(p.getDifficulty());
        existing.setCategory(p.getCategory());
        existing.setSampleInput(p.getSampleInput());
        existing.setSampleOutput(p.getSampleOutput());
        existing.setDayNumber(p.getDayNumber());

        return problemRepo.save(existing);
    }

    @DeleteMapping("/{id}")
    public String deleteProblem(@PathVariable Long id) {
        problemRepo.deleteById(id);
        return "Problem deleted";
    }

    @GetMapping
    public List<Problem> getAllProblems() {
        return problemRepo.findAll();
    }

    @GetMapping("/{id}")
    public Problem getProblem(@PathVariable Long id) {
        return problemRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Problem not found"));
    }

    @PostMapping("/{problemId}/testcases")
    public TestCase addTestCase(@PathVariable Long problemId, @RequestBody TestCase tc) {
        Problem p = problemRepo.findById(problemId)
                .orElseThrow(() -> new RuntimeException("Problem not found"));

        tc.setProblem(p);
        return testRepo.save(tc);
    }

    @PutMapping("/testcases/{testId}")
    public TestCase updateTestCase(@PathVariable Long testId, @RequestBody TestCase tc) {
        TestCase existing = testRepo.findById(testId)
                .orElseThrow(() -> new RuntimeException("Test case not found"));

        existing.setInput(tc.getInput());
        existing.setExpectedOutput(tc.getExpectedOutput());

        return testRepo.save(existing);
    }

    @DeleteMapping("/testcases/{testId}")
    public String deleteTestCase(@PathVariable Long testId) {
        testRepo.deleteById(testId);
        return "Test case deleted";
    }
}
