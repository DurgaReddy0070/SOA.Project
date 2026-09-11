package com.eventfood.event.controller;

import com.eventfood.event.dto.*;
import com.eventfood.event.entity.EventStatus;
import com.eventfood.event.service.EventService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "*")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @PostMapping
    public ResponseEntity<EventDto> createEvent(@RequestBody EventDto eventDto) {
        EventDto created = eventService.createEvent(eventDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping
    public ResponseEntity<List<EventDto>> getAllEvents(@RequestParam(required = false) Long organizerId) {
        if (organizerId != null) {
            return ResponseEntity.ok(eventService.getEventsByOrganizer(organizerId));
        }
        return ResponseEntity.ok(eventService.getAllEvents());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventDto> getEventById(@PathVariable Long id) {
        return ResponseEntity.ok(eventService.getEventById(id));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<EventDto> updateEventStatus(@PathVariable Long id, @RequestParam EventStatus status) {
        return ResponseEntity.ok(eventService.updateEventStatus(id, status));
    }

    @PostMapping("/estimate-cost")
    public ResponseEntity<CostEstimateResponse> estimateCost(@RequestBody CostEstimateRequest request) {
        return ResponseEntity.ok(eventService.calculateCost(request));
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        Map<String, String> status = new HashMap<>();
        status.put("service", "event-service");
        status.put("status", "UP");
        return ResponseEntity.ok(status);
    }
}
