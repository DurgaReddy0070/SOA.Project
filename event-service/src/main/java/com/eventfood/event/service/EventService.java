package com.eventfood.event.service;

import com.eventfood.event.dto.*;
import com.eventfood.event.entity.Event;
import com.eventfood.event.entity.EventStatus;
import com.eventfood.event.repository.EventRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventService {

    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public EventDto createEvent(EventDto dto) {
        Event event = new Event();
        event.setTitle(dto.getTitle());
        event.setEventType(dto.getEventType());
        event.setOrganizerId(dto.getOrganizerId());
        event.setOrganizerName(dto.getOrganizerName());
        event.setOrganizerEmail(dto.getOrganizerEmail());
        event.setEventDate(dto.getEventDate());
        event.setDeliveryTimeSlot(dto.getDeliveryTimeSlot());
        event.setVenueAddress(dto.getVenueAddress());
        event.setCity(dto.getCity() != null ? dto.getCity() : "Hyderabad");
        event.setExpectedGuests(dto.getExpectedGuests());
        event.setDietaryRequirements(dto.getDietaryRequirements());
        event.setCuisinePreferences(dto.getCuisinePreferences());
        event.setStatus(dto.getStatus() != null ? dto.getStatus() : EventStatus.PLANNED);
        event.setEstimatedBudget(dto.getEstimatedBudget());
        event.setSpecialInstructions(dto.getSpecialInstructions());
        event.setCreatedAt(LocalDateTime.now());

        Event saved = eventRepository.save(event);
        return mapToDto(saved);
    }

    public List<EventDto> getAllEvents() {
        return eventRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<EventDto> getEventsByOrganizer(Long organizerId) {
        return eventRepository.findByOrganizerId(organizerId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public EventDto getEventById(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found with id: " + id));
        return mapToDto(event);
    }

    public EventDto updateEventStatus(Long id, EventStatus status) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found with id: " + id));
        event.setStatus(status);
        return mapToDto(eventRepository.save(event));
    }

    public CostEstimateResponse calculateCost(CostEstimateRequest request) {
        int guests = (request.getGuestCount() != null && request.getGuestCount() > 0) ? request.getGuestCount() : 100;
        
        // Base plate rate by package type
        double baseRate;
        String pkg = request.getPackageType() != null ? request.getPackageType().toUpperCase() : "STANDARD_BUFFET";
        switch (pkg) {
            case "PREMIUM_WEDDING":
                baseRate = 750.0;
                break;
            case "EXECUTIVE_CORPORATE":
                baseRate = 550.0;
                break;
            case "HI_TEA":
                baseRate = 300.0;
                break;
            case "STANDARD_BUFFET":
            default:
                baseRate = 450.0;
                break;
        }

        // Addons per plate
        double addons = 0.0;
        if (Boolean.TRUE.equals(request.getIncludeBeverages())) {
            addons += 60.0;
        }
        if (Boolean.TRUE.equals(request.getIncludeLiveCounters())) {
            addons += 120.0;
        }
        if (Boolean.TRUE.equals(request.getIncludeDessertBar())) {
            addons += 80.0;
        }

        double effectiveRate = baseRate + addons;
        double subtotal = effectiveRate * guests;

        // Bulk tiered discount
        double discountPercent = 0.0;
        String tier = "Standard (Up to 100 guests)";
        if (guests >= 500) {
            discountPercent = 15.0;
            tier = "Mega Scale Tier (500+ guests, 15% OFF)";
        } else if (guests >= 250) {
            discountPercent = 10.0;
            tier = "Grand Event Tier (250-499 guests, 10% OFF)";
        } else if (guests >= 100) {
            discountPercent = 5.0;
            tier = "Community Tier (100-249 guests, 5% OFF)";
        }

        double discountAmount = subtotal * (discountPercent / 100.0);
        double discountedFood = subtotal - discountAmount;
        
        // Logistics & cold chain handling fee: fixed base + per guest increment
        double logisticsFee = 1500.0 + (guests * 5.0);
        
        // GST (5% for catering)
        double gst = (discountedFood + logisticsFee) * 0.05;
        double grandTotal = Math.round((discountedFood + logisticsFee + gst) * 100.0) / 100.0;

        // Buffer food plates recommendation (5-8% to avoid running short)
        int bufferPlates = Math.max(5, (int) Math.ceil(guests * 0.06));

        CostEstimateResponse res = new CostEstimateResponse();
        res.setGuestCount(guests);
        res.setBasePricePerPlate(baseRate);
        res.setAddonsPerPlate(addons);
        res.setEffectiveRatePerPlate(effectiveRate);
        res.setTotalFoodCost(subtotal);
        res.setBulkDiscountAmount(discountAmount);
        res.setBulkDiscountPercent(discountPercent);
        res.setServiceAndLogisticsFee(logisticsFee);
        res.setTaxGst(Math.round(gst * 100.0) / 100.0);
        res.setGrandTotal(grandTotal);
        res.setRecommendedBufferPlates(bufferPlates);
        res.setTierApplied(tier);

        return res;
    }

    private EventDto mapToDto(Event event) {
        EventDto dto = new EventDto();
        dto.setId(event.getId());
        dto.setTitle(event.getTitle());
        dto.setEventType(event.getEventType());
        dto.setOrganizerId(event.getOrganizerId());
        dto.setOrganizerName(event.getOrganizerName());
        dto.setOrganizerEmail(event.getOrganizerEmail());
        dto.setEventDate(event.getEventDate());
        dto.setDeliveryTimeSlot(event.getDeliveryTimeSlot());
        dto.setVenueAddress(event.getVenueAddress());
        dto.setCity(event.getCity());
        dto.setExpectedGuests(event.getExpectedGuests());
        dto.setDietaryRequirements(event.getDietaryRequirements());
        dto.setCuisinePreferences(event.getCuisinePreferences());
        dto.setStatus(event.getStatus());
        dto.setEstimatedBudget(event.getEstimatedBudget());
        dto.setSpecialInstructions(event.getSpecialInstructions());
        dto.setCreatedAt(event.getCreatedAt());
        return dto;
    }
}
