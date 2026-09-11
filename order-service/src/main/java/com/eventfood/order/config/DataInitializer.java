package com.eventfood.order.config;

import com.eventfood.order.entity.Order;
import com.eventfood.order.entity.OrderItem;
import com.eventfood.order.entity.OrderStatus;
import com.eventfood.order.repository.OrderItemRepository;
import com.eventfood.order.repository.OrderRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initOrders(OrderRepository orderRepository, OrderItemRepository itemRepository) {
        return args -> {
            if (orderRepository.count() == 0) {
                // Order 1: Preparing in Kitchen for Tech Symposium
                Order o1 = new Order();
                o1.setOrderNumber("EFM-2026-0814");
                o1.setEventId(1L);
                o1.setEventTitle("KL University Annual Tech Symposium & Hackathon");
                o1.setOrganizerId(1L);
                o1.setOrganizerName("Durga Prasad Reddy");
                o1.setOrganizerEmail("organizer@eventfood.com");
                o1.setVendorId(1L);
                o1.setVendorName("Royal Feast Grand Caterers");
                o1.setGuestCount(350);
                o1.setStatus(OrderStatus.PREPARING);
                o1.setTotalAmount(203000.0);
                o1.setDiscountAmount(20300.0);
                o1.setTaxAmount(9135.0);
                o1.setGrandTotal(191835.0);
                o1.setDeliveryDate(LocalDate.now().plusDays(7));
                o1.setDeliverySlot("12:30 PM - 02:00 PM");
                o1.setDeliveryVenue("Main Auditorium, KL University Bowrampet Campus");
                o1.setSpecialRequests("Maintain separate temperature controlled insulated food containers for Jain counter");
                o1.setPaymentStatus("PAID");
                o1.setCreatedAt(LocalDateTime.now().minusHours(4));
                o1.setUpdatedAt(LocalDateTime.now().minusMinutes(30));
                o1 = orderRepository.save(o1);

                addOrderItem(itemRepository, o1, 1L, "Hyderabadi Zafrani Mutton Dum Biryani", "MAIN_COURSE", "NON_VEG", 200, 320.0, 64000.0);
                addOrderItem(itemRepository, o1, 2L, "Paneer Tikka Angara", "STARTER", "VEG", 150, 140.0, 21000.0);
                addOrderItem(itemRepository, o1, 4L, "Dal Makhani Peshawari", "MAIN_COURSE", "VEG", 350, 120.0, 42000.0);
                addOrderItem(itemRepository, o1, 6L, "Live Jalebi & Rabdi Counter", "LIVE_COUNTER", "VEG", 350, 80.0, 28000.0);

                // Order 2: In Transit / Out for Delivery
                Order o2 = new Order();
                o2.setOrderNumber("EFM-2026-0815");
                o2.setEventId(3L);
                o2.setEventTitle("FinTech Leadership Executive Summit");
                o2.setOrganizerId(2L);
                o2.setOrganizerName("Toram Charam");
                o2.setOrganizerEmail("charam@eventfood.com");
                o2.setVendorId(4L);
                o2.setVendorName("Urban Wok & Continental Catering");
                o2.setGuestCount(120);
                o2.setStatus(OrderStatus.IN_TRANSIT);
                o2.setTotalAmount(86400.0);
                o2.setDiscountAmount(4320.0);
                o2.setTaxAmount(4104.0);
                o2.setGrandTotal(86184.0);
                o2.setDeliveryDate(LocalDate.now());
                o2.setDeliverySlot("01:00 PM - 02:30 PM");
                o2.setDeliveryVenue("ITC Kohenur, Knowledge City, Madhapur");
                o2.setSpecialRequests("Delivery van equipped with GPS live tracking and temperature sensors");
                o2.setPaymentStatus("PAID");
                o2.setCreatedAt(LocalDateTime.now().minusHours(6));
                o2.setUpdatedAt(LocalDateTime.now().minusMinutes(15));
                o2 = orderRepository.save(o2);

                addOrderItem(itemRepository, o2, 10L, "Live Artisanal Pasta Counter", "LIVE_COUNTER", "VEG", 120, 140.0, 16800.0);
                addOrderItem(itemRepository, o2, 11L, "Steamed Edamame & Truffle Dim Sum", "STARTER", "VEGAN", 120, 160.0, 19200.0);
                addOrderItem(itemRepository, o2, 12L, "Smoked Herb Chicken Steaks", "MAIN_COURSE", "NON_VEG", 80, 220.0, 17600.0);
                addOrderItem(itemRepository, o2, 13L, "Classic Italian Tiramisu", "DESSERT", "VEG", 120, 110.0, 13200.0);

                System.out.println(">>> Sample Orders initialized in Order Service DB");
            }
        };
    }

    private void addOrderItem(
            OrderItemRepository repo, Order order, Long menuItemId, String name,
            String category, String dietary, Integer qty, Double price, Double lineTotal) {
        OrderItem item = new OrderItem();
        item.setOrder(order);
        item.setMenuItemId(menuItemId);
        item.setItemName(name);
        item.setCategory(category);
        item.setDietaryType(dietary);
        item.setQuantityOrGuests(qty);
        item.setUnitPrice(price);
        item.setLineTotal(lineTotal);
        repo.save(item);
    }
}
