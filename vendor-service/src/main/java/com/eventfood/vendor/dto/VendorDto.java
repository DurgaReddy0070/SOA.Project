package com.eventfood.vendor.dto;

import java.util.List;

public class VendorDto {
    private Long id;
    private String name;
    private String description;
    private String cuisineTypes;
    private Double rating;
    private Integer ratingCount;
    private String city;
    private String address;
    private String phone;
    private String email;
    private Integer minGuests;
    private Integer maxGuests;
    private String logoUrl;
    private String bannerUrl;
    private Boolean isVerified;
    private Boolean isAvailable;
    private List<CateringPackageDto> packages;
    private List<MenuItemDto> menuItems;

    public VendorDto() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getCuisineTypes() { return cuisineTypes; }
    public void setCuisineTypes(String cuisineTypes) { this.cuisineTypes = cuisineTypes; }
    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }
    public Integer getRatingCount() { return ratingCount; }
    public void setRatingCount(Integer ratingCount) { this.ratingCount = ratingCount; }
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public Integer getMinGuests() { return minGuests; }
    public void setMinGuests(Integer minGuests) { this.minGuests = minGuests; }
    public Integer getMaxGuests() { return maxGuests; }
    public void setMaxGuests(Integer maxGuests) { this.maxGuests = maxGuests; }
    public String getLogoUrl() { return logoUrl; }
    public void setLogoUrl(String logoUrl) { this.logoUrl = logoUrl; }
    public String getBannerUrl() { return bannerUrl; }
    public void setBannerUrl(String bannerUrl) { this.bannerUrl = bannerUrl; }
    public Boolean getIsVerified() { return isVerified; }
    public void setIsVerified(Boolean verified) { isVerified = verified; }
    public Boolean getIsAvailable() { return isAvailable; }
    public void setIsAvailable(Boolean available) { isAvailable = available; }
    public List<CateringPackageDto> getPackages() { return packages; }
    public void setPackages(List<CateringPackageDto> packages) { this.packages = packages; }
    public List<MenuItemDto> getMenuItems() { return menuItems; }
    public void setMenuItems(List<MenuItemDto> menuItems) { this.menuItems = menuItems; }
}
