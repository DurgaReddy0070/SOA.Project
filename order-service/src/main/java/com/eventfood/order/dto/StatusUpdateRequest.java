package com.eventfood.order.dto;

import com.eventfood.order.entity.OrderStatus;

public class StatusUpdateRequest {
    private OrderStatus status;
    private String remarks;

    public StatusUpdateRequest() {}

    public OrderStatus getStatus() { return status; }
    public void setStatus(OrderStatus status) { this.status = status; }

    public String getRemarks() { return remarks; }
    public void setRemarks(String remarks) { this.remarks = remarks; }
}
