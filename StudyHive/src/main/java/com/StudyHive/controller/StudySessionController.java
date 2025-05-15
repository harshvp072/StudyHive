package com.StudyHive.controller;

import com.StudyHive.entity.StudySession;
import com.StudyHive.service.StudySessionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sessions")
public class StudySessionController {

    private final StudySessionService service;

    public StudySessionController(StudySessionService service) {
        this.service = service;
    }

    @PostMapping
    public StudySession createSession(@RequestBody StudySession session) {
        return service.saveSession(session);
    }

    @GetMapping("/month")
    public List<StudySession> getMonthlySessions(@RequestParam int year, @RequestParam int month) {
        return service.getSessionsForMonth(year, month);
    }
}
