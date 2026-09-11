package com.eventfood.payment.dto;

import java.time.LocalDateTime;

public class InvoiceDto {
    private String invoiceNumber;
    private String transactionId;
    private String orderNumber;
    private Double subtotal;
    private Double discount;
    private Double cgst;
    private Double sgst;
    private Double grandTotal;
    private String paymentMethod;
    private String paymentStatus;
    private LocalDateTime issuedAt;
    private String billToName;
    private String billToEmail;

    public InvoiceDto() {}

    // Getters and Setters
    public String getInvoiceNumber() { return invoiceNumber; }
    public void setInvoiceNumber(String invoiceNumber) { this.invoiceNumber = invoiceNumber; }
    public String getTransactionId() { return transactionId; }
    public void setTransactionId(String transactionId) { this.transactionId = transactionId; }
    public String getOrderNumber() { return orderNumber; }
    public void setOrderNumber(String orderNumber) { this.orderNumber = orderNumber; }
    public Double getSubtotal() { return subtotal; }
    public void setSubtotal(Double subtotal) { this.subtotal = subtotal; }
    public Double getDiscount() { return discount; }
    public void setDiscount(Double discount) { this.discount = discount; }
    public Double getCgst() { return cgst; }
    public void setCgst(Double cgst) { this.cgst = cgst; }
    public Double getSgst() { return sgst; }
    public void setSgst(Double sgst) { this.sgst = sgst; }
    public Double getGrandTotal() { return grandTotal; }
    public void setGrandTotal(Double grandTotal) { this.grandTotal = grandTotal; }
    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
    public String getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }
    public LocalDateTime getIssuedAt() { return issuedAt; }
    public void setIssuedAt(LocalDateTime issuedAt) { this.issuedAt = issuedAt; }
    public String getBillToName() { return billToName; }
    public void setBillToName(String billToName) { this.billToName = billToName; }
    public String getBillToEmail() { return billToEmail; }
    public void setBillToEmail(String billToEmail) { this.billToEmail = billToEmail; }
}
