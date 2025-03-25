package com.example.notifacation.controller;

import com.example.notifacation.entity.Notification;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class NotificationController {
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @PostMapping("/api/notify")
    public ResponseEntity<Void> sendNotification(@RequestBody Notification notification) {
        messagingTemplate.convertAndSend("/topic/notifications", notification);
        return ResponseEntity.ok().build();
    }
}
