package com.StudyHive.service;

import com.StudyHive.entity.StudySession;
import com.StudyHive.repository.StudySessionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class StudySessionService {

    private final StudySessionRepository repository;

    public StudySessionService(StudySessionRepository repository) {
        this.repository = repository;
    }

    public StudySession saveSession(StudySession session) {
        return repository.save(session);
    }

    public List<StudySession> getSessionsForMonth(int year, int month) {
        LocalDateTime start = LocalDateTime.of(year, month, 1, 0, 0);
        LocalDateTime end = start.plusMonths(1);
        return repository.findByStartTimeBetween(start, end);
    }
}