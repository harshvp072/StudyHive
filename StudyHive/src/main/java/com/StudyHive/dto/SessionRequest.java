package com.StudyHive.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class SessionRequest {
    private String username;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String course;
    private String notes;
}
