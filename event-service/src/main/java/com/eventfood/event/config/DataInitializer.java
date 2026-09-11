package com.eventfood.event.config;

import com.eventfood.event.entity.Event;
import com.eventfood.event.entity.EventStatus;
import com.eventfood.event.entity.EventType;
import com.eventfood.event.repository.EventRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initEvents(EventRepository eventRepository) {
        return args -> {
            if (eventRepository.count() == 0) {
                // Event 1: KL University Annual Tech Symposium
                Event event1 = new Event();
                event1.setTitle("KL University Annual Tech Symposium & Hackathon");
                event1.setEventType(EventType.COLLEGE_FEST);
                event1.setOrganizerId(1L);
                event1.setOrganizerName("Durga Prasad Reddy");
                event1.setOrganizerEmail("organizer@eventfood.com");
                event1.setEventDate(LocalDate.now().plusDays(7));
                event1.setDeliveryTimeSlot("12:30 PM - 02:00 PM");
                event1.setVenueAddress("Main Auditorium, KL University Bowrampet Campus");
                event1.setCity("Hyderabad");
                event1.setExpectedGuests(350);
                event1.setDietaryRequirements("VEG,NON_VEG,JAIN");
                event1.setCuisinePreferences("South Indian, North Indian, Desserts");
                event1.setStatus(EventStatus.PLANNED);
                event1.setEstimatedBudget(175000.0);
                event1.setSpecialInstructions("Include hot beverage counters and separate Jain food station");
                event1.setCreatedAt(LocalDateTime.now());
                eventRepository.save(event1);

                // Event 2: Royal Wedding Reception & Sangeet
                Event event2 = new Event();
                event2.setTitle("Grand Sangeet & Royal Wedding Dinner");
                event2.setEventType(EventType.WEDDING);
                event2.setOrganizerId(1L);
                event2.setOrganizerName("Durga Prasad Reddy");
                event2.setOrganizerEmail("organizer@eventfood.com");
                event2.setEventDate(LocalDate.now().plusDays(15));
                event2.setDeliveryTimeSlot("07:30 PM - 10:30 PM");
                event2.setVenueAddress("Novotel Convention Centre, Hitec City");
                event2.setCity("Hyderabad");
                event2.setExpectedGuests(600);
                event2.setDietaryRequirements("VEG,NON_VEG,VEGAN,GLUTEN_FREE");
                event2.setCuisinePreferences("Hyderabadi Mughlai, Awadhi, Italian Live Counter, Mocktails");
                event2.setStatus(EventStatus.MENU_SELECTED);
                event2.setEstimatedBudget(450000.0);
                event2.setSpecialInstructions("Live chaat and grill counter with dedicated chef staff");
                event2.setCreatedAt(LocalDateTime.now());
                eventRepository.save(event2);

                // Event 3: Corporate Global Summit
                Event event3 = new Event();
                event3.setTitle("FinTech Leadership Executive Summit");
                event3.setEventType(EventType.CORPORATE);
                event3.setOrganizerId(2L);
                event3.setOrganizerName("Toram Charam");
                event3.setOrganizerEmail("charam@eventfood.com");
                event3.setEventDate(LocalDate.now().plusDays(4));
                event3.setDeliveryTimeSlot("01:00 PM - 02:30 PM");
                event3.setVenueAddress("ITC Kohenur, Knowledge City, Madhapur");
                event3.setCity("Hyderabad");
                event3.setExpectedGuests(120);
                event3.setDietaryRequirements("VEG,NON_VEG,GLUTEN_FREE");
                event3.setCuisinePreferences("Continental, Pan-Asian, Gourmet Salads");
                event3.setStatus(EventStatus.ORDER_PLACED);
                event3.setEstimatedBudget(84000.0);
                event3.setSpecialInstructions("Individual pre-packaged premium eco-friendly bento trays");
                event3.setCreatedAt(LocalDateTime.now());
                eventRepository.save(event3);

                System.out.println(">>> Sample Events initialized in Event Service DB");
            }
        };
    }
}
