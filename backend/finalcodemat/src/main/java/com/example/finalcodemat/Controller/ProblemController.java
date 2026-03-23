package com.example.finalcodemat.Controller;

import com.example.finalcodemat.models.Problem;
import com.example.finalcodemat.Service.ProblemService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/problems")
@CrossOrigin
@RequiredArgsConstructor
public class ProblemController {

    private final ProblemService service;

    @PostMapping("/add")
    public Problem addProblem(@RequestBody Problem problem) {
        return service.addProblem(problem);
    }

    @GetMapping("/all")
    public List<Problem> getAll() {
        return service.getAllProblems();
    }

    @GetMapping("/{id}")
    public Problem getOne(@PathVariable Long id) {
        return service.getProblem(id);
    }

    // ✅ ADD THIS
    @GetMapping("/day/{day}")
    public List<Problem> getByDay(@PathVariable int day) {
        return service.getProblemsByDay(day);
    }
}
