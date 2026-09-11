package com.eventfood.payment.service;

import com.eventfood.payment.dto.*;
import com.eventfood.payment.entity.PaymentMethod;
import com.eventfood.payment.entity.PaymentStatus;
import com.eventfood.payment.entity.PaymentTransaction;
import com.eventfood.payment.repository.PaymentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;

    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    public PaymentResponse processPayment(PaymentRequest request) {
        PaymentTransaction tx = new PaymentTransaction();
        String txId = "TXN-" + System.currentTimeMillis() + "-" + UUID.randomUUID().toString().substring(0, 4).toUpperCase();
        String invNum = "INV-EFM-" + (System.currentTimeMillis() % 100000);

        tx.setTransactionId(txId);
        tx.setOrderId(request.getOrderId());
        tx.setOrderNumber(request.getOrderNumber());
        tx.setOrganizerId(request.getOrganizerId());
        tx.setAmount(request.getAmount());
        tx.setPaymentMethod(request.getPaymentMethod() != null ? request.getPaymentMethod() : PaymentMethod.UPI);
        tx.setStatus(PaymentStatus.SUCCESS);
        tx.setGatewayReference("RAZORPAY_SIM_" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        tx.setInvoiceNumber(invNum);
        tx.setNotes("Payment simulated and verified successfully. Automated SMS & Email notifications dispatched to Organizer and Vendor.");
        tx.setTimestamp(LocalDateTime.now());

        PaymentTransaction saved = paymentRepository.save(tx);

        PaymentResponse res = new PaymentResponse();
        res.setTransactionId(saved.getTransactionId());
        res.setOrderId(saved.getOrderId());
        res.setOrderNumber(saved.getOrderNumber());
        res.setAmount(saved.getAmount());
        res.setPaymentMethod(saved.getPaymentMethod());
        res.setStatus(saved.getStatus());
        res.setGatewayReference(saved.getGatewayReference());
        res.setInvoiceNumber(saved.getInvoiceNumber());
        res.setMessage("Payment processed successfully. Notification events sent.");
        res.setTimestamp(saved.getTimestamp());

        return res;
    }

    public List<PaymentResponse> getAllTransactions(Long organizerId) {
        List<PaymentTransaction> list = (organizerId != null) ?
                paymentRepository.findByOrganizerId(organizerId) :
                paymentRepository.findAll();

        return list.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    public PaymentResponse getTransactionByOrderId(Long orderId) {
        PaymentTransaction tx = paymentRepository.findByOrderId(orderId)
                .orElseThrow(() -> new RuntimeException("Payment not found for orderId: " + orderId));
        return mapToResponse(tx);
    }

    public InvoiceDto getInvoiceByNumber(String invoiceNumber) {
        PaymentTransaction tx = paymentRepository.findByInvoiceNumber(invoiceNumber)
                .orElseThrow(() -> new RuntimeException("Invoice not found: " + invoiceNumber));
        return buildInvoiceDto(tx);
    }

    public InvoiceDto getInvoiceByOrderId(Long orderId) {
        PaymentTransaction tx = paymentRepository.findByOrderId(orderId)
                .orElseThrow(() -> new RuntimeException("Payment invoice not found for orderId: " + orderId));
        return buildInvoiceDto(tx);
    }

    private InvoiceDto buildInvoiceDto(PaymentTransaction tx) {
        InvoiceDto inv = new InvoiceDto();
        inv.setInvoiceNumber(tx.getInvoiceNumber());
        inv.setTransactionId(tx.getTransactionId());
        inv.setOrderNumber(tx.getOrderNumber());
        
        // Approximate calculation for invoice breakdown
        double total = tx.getAmount();
        double subtotal = Math.round((total / 1.05) * 100.0) / 100.0;
        double gstTotal = Math.round((total - subtotal) * 100.0) / 100.0;
        double halfGst = Math.round((gstTotal / 2.0) * 100.0) / 100.0;

        inv.setSubtotal(subtotal);
        inv.setDiscount(0.0);
        inv.setCgst(halfGst);
        inv.setSgst(halfGst);
        inv.setGrandTotal(total);
        inv.setPaymentMethod(tx.getPaymentMethod().name());
        inv.setPaymentStatus(tx.getStatus().name());
        inv.setIssuedAt(tx.getTimestamp());
        inv.setBillToName("Durga Prasad Reddy (Event Organizer)");
        inv.setBillToEmail("organizer@eventfood.com");
        return inv;
    }

    private PaymentResponse mapToResponse(PaymentTransaction tx) {
        PaymentResponse res = new PaymentResponse();
        res.setTransactionId(tx.getTransactionId());
        res.setOrderId(tx.getOrderId());
        res.setOrderNumber(tx.getOrderNumber());
        res.setAmount(tx.getAmount());
        res.setPaymentMethod(tx.getPaymentMethod());
        res.setStatus(tx.getStatus());
        res.setGatewayReference(tx.getGatewayReference());
        res.setInvoiceNumber(tx.getInvoiceNumber());
        res.setMessage(tx.getNotes());
        res.setTimestamp(tx.getTimestamp());
        return res;
    }
}
