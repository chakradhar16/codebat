package com.example.finalcodemat.Service;

import org.springframework.stereotype.Service;
import java.io.*;
import java.nio.file.*;
import java.util.stream.Collectors;

@Service
public class CodeRunServiceSingleInput {

    public String run(String code, String input) {
        try {
            Path tempDir = Files.createTempDirectory("exec");
            Path javaFile = tempDir.resolve("Main.java");

            Files.write(javaFile, code.getBytes());

            // compile
            Process compile = new ProcessBuilder("javac", javaFile.toString())
                    .directory(tempDir.toFile()).start();
            compile.waitFor();

            String compileErrors = new BufferedReader(
                    new InputStreamReader(compile.getErrorStream()))
                    .lines()
                    .collect(Collectors.joining("\n"));

            if (!compileErrors.isEmpty()) return compileErrors;

            // run
            Process run = new ProcessBuilder("java", "-cp", tempDir.toString(), "Main")
                    .directory(tempDir.toFile()).start();

            // push input
            try (BufferedWriter writer =
                         new BufferedWriter(new OutputStreamWriter(run.getOutputStream()))) {
                writer.write(input);
                writer.flush();
            }

            String output = new BufferedReader(
                    new InputStreamReader(run.getInputStream()))
                    .lines()
                    .collect(Collectors.joining("\n"));

            run.waitFor();

            return output;

        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }
}
