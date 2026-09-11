package com.eventfood.event.dto;

public class CostEstimateRequest {
    private Integer guestCount;
    private String packageType; // e.g., "PREMIUM_WEDDING", "EXECUTIVE_CORPORATE", "STANDARD_BUFFET", "HI_TEA"
    private String cuisineType;
    private Boolean includeBeverages;
    private Boolean includeLiveCounters;
    private Boolean includeDessertBar;

    public CostEstimateRequest() {}

    public Integer getGuestCount() { return guestCount; }
    public void setGuestCount(Integer guestCount) { this.guestCount = guestCount; }

    public String getPackageType() { return packageType; }
    public void setPackageType(String packageType) { this.packageType = packageType; }

    public String getCuisineType() { return cuisineType; }
    public void setCuisineType(String cuisineType) { this.cuisineType = cuisineType; }

    public Boolean getIncludeBeverages() { return includeBeverages; }
    public void setIncludeBeverages(Boolean includeBeverages) { this.includeBeverages = includeBeverages; }

    public Boolean getIncludeLiveCounters() { return includeLiveCounters; }
    public void setIncludeLiveCounters(Boolean includeLiveCounters) { this.includeLiveCounters = includeLiveCounters; }

    public Boolean getIncludeDessertBar() { return includeDessertBar; }
    public void setIncludeDessertBar(Boolean includeDessertBar) { this.includeDessertBar = includeDessertBar; }
}
