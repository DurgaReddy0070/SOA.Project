package com.eventfood.order.dto;

public class OrderItemDto {
    private Long id;
    private Long menuItemId;
    private String itemName;
    private String category;
    private String dietaryType;
    private Integer quantityOrGuests;
    private Double unitPrice;
    private Double lineTotal;

    public OrderItemDto() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getMenuItemId() { return menuItemId; }
    public void setMenuItemId(Long menuItemId) { this.menuItemId = menuItemId; }
    public String getItemName() { return itemName; }
    public void setItemName(String itemName) { this.itemName = itemName; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getDietaryType() { return dietaryType; }
    public void setDietaryType(String dietaryType) { this.dietaryType = dietaryType; }
    public Integer getQuantityOrGuests() { return quantityOrGuests; }
    public void setQuantityOrGuests(Integer quantityOrGuests) { this.quantityOrGuests = quantityOrGuests; }
    public Double getUnitPrice() { return unitPrice; }
    public void setUnitPrice(Double unitPrice) { this.unitPrice = unitPrice; }
    public Double getLineTotal() { return lineTotal; }
    public void setLineTotal(Double lineTotal) { this.lineTotal = lineTotal; }
}
