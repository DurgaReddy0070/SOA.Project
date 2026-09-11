package com.eventfood.order.service;

import com.eventfood.order.dto.*;
import com.eventfood.order.entity.Order;
import com.eventfood.order.entity.OrderItem;
import com.eventfood.order.entity.OrderStatus;
import com.eventfood.order.repository.OrderItemRepository;
import com.eventfood.order.repository.OrderRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository itemRepository;

    public OrderService(OrderRepository orderRepository, OrderItemRepository itemRepository) {
        this.orderRepository = orderRepository;
        this.itemRepository = itemRepository;
    }

    @Transactional
    public OrderResponse createOrder(OrderRequest request) {
        Order order = new Order();
        String orderNum = "EFM-" + (System.currentTimeMillis() % 1000000) + "-" + UUID.randomUUID().toString().substring(0, 4).toUpperCase();
        order.setOrderNumber(orderNum);
        order.setEventId(request.getEventId());
        order.setEventTitle(request.getEventTitle());
        order.setOrganizerId(request.getOrganizerId());
        order.setOrganizerName(request.getOrganizerName());
        order.setOrganizerEmail(request.getOrganizerEmail());
        order.setVendorId(request.getVendorId());
        order.setVendorName(request.getVendorName());
        order.setGuestCount(request.getGuestCount() != null ? request.getGuestCount() : 100);
        order.setStatus(OrderStatus.PLACED);
        order.setTotalAmount(request.getTotalAmount());
        order.setDiscountAmount(request.getDiscountAmount() != null ? request.getDiscountAmount() : 0.0);
        order.setTaxAmount(request.getTaxAmount() != null ? request.getTaxAmount() : 0.0);
        order.setGrandTotal(request.getGrandTotal());
        order.setDeliveryDate(request.getDeliveryDate());
        order.setDeliverySlot(request.getDeliverySlot());
        order.setDeliveryVenue(request.getDeliveryVenue());
        order.setSpecialRequests(request.getSpecialRequests());
        order.setPaymentStatus("PAID");
        order.setCreatedAt(LocalDateTime.now());
        order.setUpdatedAt(LocalDateTime.now());

        Order saved = orderRepository.save(order);

        if (request.getItems() != null && !request.getItems().isEmpty()) {
            for (OrderItemDto itemDto : request.getItems()) {
                OrderItem item = new OrderItem();
                item.setOrder(saved);
                item.setMenuItemId(itemDto.getMenuItemId());
                item.setItemName(itemDto.getItemName());
                item.setCategory(itemDto.getCategory());
                item.setDietaryType(itemDto.getDietaryType());
                item.setQuantityOrGuests(itemDto.getQuantityOrGuests() != null ? itemDto.getQuantityOrGuests() : order.getGuestCount());
                item.setUnitPrice(itemDto.getUnitPrice());
                item.setLineTotal(itemDto.getLineTotal() != null ? itemDto.getLineTotal() : (itemDto.getUnitPrice() * order.getGuestCount()));
                itemRepository.save(item);
                saved.getItems().add(item);
            }
        }

        return mapToResponse(saved);
    }

    public List<OrderResponse> getAllOrders(Long organizerId, Long vendorId, Long eventId) {
        List<Order> orders;
        if (organizerId != null) {
            orders = orderRepository.findByOrganizerId(organizerId);
        } else if (vendorId != null) {
            orders = orderRepository.findByVendorId(vendorId);
        } else if (eventId != null) {
            orders = orderRepository.findByEventId(eventId);
        } else {
            orders = orderRepository.findAll();
        }

        return orders.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public OrderResponse getOrderById(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
        return mapToResponse(order);
    }

    public OrderResponse getOrderByNumber(String orderNumber) {
        Order order = orderRepository.findByOrderNumber(orderNumber)
                .orElseThrow(() -> new RuntimeException("Order not found with orderNumber: " + orderNumber));
        return mapToResponse(order);
    }

    @Transactional
    public OrderResponse updateOrderStatus(Long id, OrderStatus status) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
        order.setStatus(status);
        order.setUpdatedAt(LocalDateTime.now());
        Order updated = orderRepository.save(order);
        return mapToResponse(updated);
    }

    private OrderResponse mapToResponse(Order o) {
        OrderResponse res = new OrderResponse();
        res.setId(o.getId());
        res.setOrderNumber(o.getOrderNumber());
        res.setEventId(o.getEventId());
        res.setEventTitle(o.getEventTitle());
        res.setOrganizerId(o.getOrganizerId());
        res.setOrganizerName(o.getOrganizerName());
        res.setOrganizerEmail(o.getOrganizerEmail());
        res.setVendorId(o.getVendorId());
        res.setVendorName(o.getVendorName());
        res.setGuestCount(o.getGuestCount());
        res.setStatus(o.getStatus());
        res.setTotalAmount(o.getTotalAmount());
        res.setDiscountAmount(o.getDiscountAmount());
        res.setTaxAmount(o.getTaxAmount());
        res.setGrandTotal(o.getGrandTotal());
        res.setDeliveryDate(o.getDeliveryDate());
        res.setDeliverySlot(o.getDeliverySlot());
        res.setDeliveryVenue(o.getDeliveryVenue());
        res.setSpecialRequests(o.getSpecialRequests());
        res.setPaymentStatus(o.getPaymentStatus());
        res.setCreatedAt(o.getCreatedAt());
        res.setUpdatedAt(o.getUpdatedAt());

        if (o.getItems() != null) {
            res.setItems(o.getItems().stream()
                    .map(this::mapToItemDto)
                    .collect(Collectors.toList()));
        }
        return res;
    }

    private OrderItemDto mapToItemDto(OrderItem i) {
        OrderItemDto dto = new OrderItemDto();
        dto.setId(i.getId());
        dto.setMenuItemId(i.getMenuItemId());
        dto.setItemName(i.getItemName());
        dto.setCategory(i.getCategory());
        dto.setDietaryType(i.getDietaryType());
        dto.setQuantityOrGuests(i.getQuantityOrGuests());
        dto.setUnitPrice(i.getUnitPrice());
        dto.setLineTotal(i.getLineTotal());
        return dto;
    }
}
