package com.example.finalcodemat.Controller;

import com.example.finalcodemat.models.TestCase;
import com.example.finalcodemat.Service.TestCaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/testcases")
@CrossOrigin
@RequiredArgsConstructor
public class TestCaseController {

    private final TestCaseService service;

    // ADD TESTCASE (ADMIN ONLY via SecurityConfig)
    @PostMapping("/add/{problemId}")
    public TestCase addTestCase(@RequestBody TestCase testCase, @PathVariable Long problemId) {
        return service.addTestCase(testCase, problemId);
    }

    // GET TESTCASES BY PROBLEM (ADMIN ONLY)
    @GetMapping("/problem/{problemId}")
    public List<TestCase> getByProblem(@PathVariable Long problemId) {
        return service.getTestCasesByProblem(problemId);
    }

    // UPDATE TESTCASE (ADMIN ONLY)
    @PutMapping("/{testId}")
    public TestCase updateTestCase(@PathVariable Long testId, @RequestBody TestCase updated) {
        return service.updateTestCase(testId, updated);
    }

    // DELETE TESTCASE (ADMIN ONLY)
    @DeleteMapping("/{testId}")
    public String deleteTestCase(@PathVariable Long testId) {
        service.deleteTestCase(testId);
        return "Testcase deleted";
    }
}
