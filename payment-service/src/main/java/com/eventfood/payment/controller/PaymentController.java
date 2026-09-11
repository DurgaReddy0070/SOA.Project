package com.eventfood.payment.controller;

import com.eventfood.payment.dto.*;
import com.eventfood.payment.service.PaymentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "*")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/process")
    public ResponseEntity<PaymentResponse> processPayment(@RequestBody PaymentRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(paymentService.processPayment(request));
    }

    @GetMapping
    public ResponseEntity<List<PaymentResponse>> getAllTransactions(
            @RequestParam(required = false) Long organizerId) {
        return ResponseEntity.ok(paymentService.getAllTransactions(organizerId));
    }

    @GetMapping("/order/{orderId}")
    public ResponseEntity<PaymentResponse> getByOrderId(@PathVariable Long orderId) {
        return ResponseEntity.ok(paymentService.getTransactionByOrderId(orderId));
    }

    @GetMapping("/invoice/order/{orderId}")
    public ResponseEntity<InvoiceDto> getInvoiceByOrderId(@PathVariable Long orderId) {
        return ResponseEntity.ok(paymentService.getInvoiceByOrderId(orderId));
    }

    @GetMapping("/invoice/{invoiceNumber}")
    public ResponseEntity<InvoiceDto> getInvoiceByNumber(@PathVariable String invoiceNumber) {
        return ResponseEntity.ok(paymentService.getInvoiceByNumber(invoiceNumber));
    }

    @PostMapping("/notify")
    public ResponseEntity<Map<String, Object>> triggerNotification(@RequestBody Map<String, Object> payload) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "DELIVERED");
        response.put("channels", List.of("SMS", "EMAIL", "PUSH"));
        response.put("recipient", payload.getOrDefault("recipient", "organizer@eventfood.com"));
        response.put("message", "Payment and Order confirmation alerts sent successfully.");
        response.put("timestamp", System.currentTimeMillis());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        Map<String, String> status = new HashMap<>();
        status.put("service", "payment-service");
        status.put("status", "UP");
        return ResponseEntity.ok(status);
    }
}
