package com.eventfood.vendor.dto;

public class MenuItemDto {
    private Long id;
    private Long vendorId;
    private Long packageId;
    private String name;
    private String category;
    private String dietaryType;
    private Double price;
    private String description;
    private Boolean isChefSpecial;

    public MenuItemDto() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getVendorId() { return vendorId; }
    public void setVendorId(Long vendorId) { this.vendorId = vendorId; }
    public Long getPackageId() { return packageId; }
    public void setPackageId(Long packageId) { this.packageId = packageId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getDietaryType() { return dietaryType; }
    public void setDietaryType(String dietaryType) { this.dietaryType = dietaryType; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Boolean getIsChefSpecial() { return isChefSpecial; }
    public void setIsChefSpecial(Boolean chefSpecial) { isChefSpecial = chefSpecial; }
}
