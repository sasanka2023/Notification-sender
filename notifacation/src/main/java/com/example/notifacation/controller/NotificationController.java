package com.example.notifacation.controller;

import com.example.notifacation.entity.Notification;
import com.example.notifacation.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class NotificationController {
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private NotificationService notificationService;

    @PostMapping("/api/notify")
    public ResponseEntity<Notification> sendNotification(@RequestBody Notification notification) {

        Notification savedNotification = notificationService.saveNotification(notification);
        messagingTemplate.convertAndSend("/topic/notifications", notification);
        return ResponseEntity.ok(savedNotification);
    }

    @GetMapping("/api/notifications")
    public ResponseEntity<List<Notification>> getAllNotifications() {
        return ResponseEntity.ok(notificationService.getAllNotifications());
    }
}
