package com.eventfood.order.repository;

import com.eventfood.order.entity.Order;
import com.eventfood.order.entity.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Optional<Order> findByOrderNumber(String orderNumber);
    List<Order> findByOrganizerId(Long organizerId);
    List<Order> findByVendorId(Long vendorId);
    List<Order> findByEventId(Long eventId);
    List<Order> findByStatus(OrderStatus status);
}
