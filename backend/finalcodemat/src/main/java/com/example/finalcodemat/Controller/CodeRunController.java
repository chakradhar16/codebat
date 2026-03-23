package com.example.finalcodemat.Controller;

import jakarta.annotation.PreDestroy;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.util.*;
import java.util.concurrent.*;
import java.util.stream.Collectors;

@RestController
public class CodeRunController {

    private static final int MAX_EXECUTION_SECONDS = 5;
    private static final long MAX_SOURCE_SIZE = 50_000; // 50 KB

    private final ExecutorService executor = Executors.newCachedThreadPool();

    @PostMapping("/run")
    public Map<String, String> runCode(@RequestBody Map<String, String> body) {

        String code = body.get("code");
        String input = body.getOrDefault("input", "");

        if (code == null || code.isBlank()) {
            return Map.of("output", "Error: Code is empty");
        }

        if (code.length() > MAX_SOURCE_SIZE) {
            return Map.of("output", "Error: Code size exceeds limit");
        }

        try {
            return executeJava(code, input);
        } catch (Exception e) {
            return Map.of("output", "Server Error");
        }
    }

    private Map<String, String> executeJava(String code, String input) throws Exception {

        Path tempDir = Files.createTempDirectory("coderun_");
        Path javaFile = tempDir.resolve("Main.java");

        Files.write(javaFile, code.getBytes(StandardCharsets.UTF_8));

        try {
            // Compile
            Process compile = new ProcessBuilder("javac", "Main.java")
                    .directory(tempDir.toFile())
                    .start();

            if (!compile.waitFor(3, TimeUnit.SECONDS)) {
                compile.destroyForcibly();
                return Map.of("output", "Compilation timeout");
            }

            String compileErrors = readStream(compile.getErrorStream());
            if (!compileErrors.isBlank()) {
                return Map.of("output", "Compilation Error:\n" + compileErrors);
            }

            // Run with timeout
            Process run = new ProcessBuilder("java", "-Xmx128m", "Main")
                    .directory(tempDir.toFile())
                    .start();

            if (input != null && !input.isBlank()) {
                try (BufferedWriter writer =
                             new BufferedWriter(new OutputStreamWriter(run.getOutputStream()))) {
                    writer.write(input);
                    writer.flush();
                }
            }

            Future<String> outputFuture = executor.submit(() ->
                    readStream(run.getInputStream())
            );

            if (!run.waitFor(MAX_EXECUTION_SECONDS, TimeUnit.SECONDS)) {
                run.destroyForcibly();
                return Map.of("output", "Time Limit Exceeded");
            }

            String runtimeErrors = readStream(run.getErrorStream());
            if (!runtimeErrors.isBlank()) {
                return Map.of("output", "Runtime Error:\n" + runtimeErrors);
            }

            return Map.of("output", outputFuture.get());

        } finally {
            deleteDirectory(tempDir);
        }
    }

    private String readStream(InputStream stream) throws IOException {
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(stream))) {
            return reader.lines().collect(Collectors.joining("\n"));
        }
    }

    private void deleteDirectory(Path dir) {
        try {
            Files.walk(dir)
                    .sorted(Comparator.reverseOrder())
                    .forEach(path -> {
                        try {
                            Files.deleteIfExists(path);
                        } catch (IOException ignored) {}
                    });
        } catch (IOException ignored) {}
    }

    @PreDestroy
    public void shutdown() {
        executor.shutdownNow();
    }
}
