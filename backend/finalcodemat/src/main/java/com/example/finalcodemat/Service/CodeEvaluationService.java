package com.example.finalcodemat.Service;

import com.example.finalcodemat.models.TestCase;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.example.finalcodemat.Repository.TestCaseRepository;

import org.springframework.stereotype.Service;


import java.util.*;
import java.util.stream.Collectors;

@Service
public class CodeEvaluationService {

    private final TestCaseRepository testRepo;
    private final SubmissionService submissionService;
    private final CodeRunServiceSingleInput codeRunner;  

    public CodeEvaluationService(
            TestCaseRepository testRepo,
            SubmissionService submissionService,
            CodeRunServiceSingleInput codeRunner
    ) {
        this.testRepo = testRepo;
        this.submissionService = submissionService;
        this.codeRunner = codeRunner;
    }
    private String convertJsonToConsoleInput(String input) {

       
        input = input.trim();
        if (!input.startsWith("{")) {
            return input;
        }

        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(input);

            JsonNode nums = root.get("nums");
            int target = root.get("target").asInt();

            StringBuilder sb = new StringBuilder();

            sb.append(nums.size()).append("\n");

            for (int i = 0; i < nums.size(); i++) {
                sb.append(nums.get(i).asInt());
                if (i < nums.size() - 1) sb.append(" ");
            }

            sb.append("\n").append(target);

            return sb.toString();

        } catch (Exception e) {
            return "ERROR";
        }
    }

    public Map<String, Object> evaluate(Long userId, Long problemId, String code) {

        List<TestCase> tests = testRepo.findByProblemId(problemId);

        int passed = 0;
        List<Map<String, String>> results = new ArrayList<>();

        for (TestCase tc : tests) {
            String consoleInput = convertJsonToConsoleInput(tc.getInput());
            String output = codeRunner.run(code, consoleInput).trim();

            boolean correct = output.equals(tc.getExpectedOutput().trim());

            if (correct) passed++;

            results.add(Map.of(
                    "input", tc.getInput(),
                    "expected", tc.getExpectedOutput(),
                    "output", output,
                    "status", correct ? "PASSED" : "FAILED"
            ));
        }

        boolean allPassed = passed == tests.size();

      
        submissionService.saveSubmission(userId, problemId, allPassed);

        return Map.of(
                "passed", passed,
                "total", tests.size(),
                "allPassed", allPassed,
                "results", results
        );
    }
}
