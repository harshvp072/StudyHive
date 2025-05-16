package com.StudyHive.controller;

import com.StudyHive.dto.SessionRequest;
import com.StudyHive.entity.StudySession;
import com.StudyHive.entity.User;
import com.StudyHive.repository.StudySessionRepository;
import com.StudyHive.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/sessions")
@RequiredArgsConstructor
public class StudySessionController {

    private final StudySessionRepository sessionRepo;
    private final UserRepository userRepo;

    @PostMapping
    public StudySession createSession(@RequestBody SessionRequest req) {
        User user = userRepo.findByUsername(req.getUsername());
        if (user == null) throw new RuntimeException("User not found");

        StudySession session = new StudySession();
        session.setUser(user);
        session.setCourse(req.getCourse());
        session.setNotes(req.getNotes());
        session.setStartTime(req.getStartTime());
        session.setEndTime(req.getEndTime());

        return sessionRepo.save(session);
    }
}
