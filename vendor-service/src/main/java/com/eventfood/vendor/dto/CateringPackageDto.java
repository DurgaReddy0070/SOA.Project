package com.eventfood.vendor.dto;

public class CateringPackageDto {
    private Long id;
    private Long vendorId;
    private String vendorName;
    private String name;
    private String description;
    private String packageType;
    private Double pricePerPerson;
    private Integer minGuests;
    private Boolean includesBeverages;
    private Boolean includesLiveCounters;
    private Boolean includesDessert;
    private String itemsSummary;
    private String popularBadge;

    public CateringPackageDto() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getVendorId() { return vendorId; }
    public void setVendorId(Long vendorId) { this.vendorId = vendorId; }
    public String getVendorName() { return vendorName; }
    public void setVendorName(String vendorName) { this.vendorName = vendorName; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getPackageType() { return packageType; }
    public void setPackageType(String packageType) { this.packageType = packageType; }
    public Double getPricePerPerson() { return pricePerPerson; }
    public void setPricePerPerson(Double pricePerPerson) { this.pricePerPerson = pricePerPerson; }
    public Integer getMinGuests() { return minGuests; }
    public void setMinGuests(Integer minGuests) { this.minGuests = minGuests; }
    public Boolean getIncludesBeverages() { return includesBeverages; }
    public void setIncludesBeverages(Boolean includesBeverages) { this.includesBeverages = includesBeverages; }
    public Boolean getIncludesLiveCounters() { return includesLiveCounters; }
    public void setIncludesLiveCounters(Boolean includesLiveCounters) { this.includesLiveCounters = includesLiveCounters; }
    public Boolean getIncludesDessert() { return includesDessert; }
    public void setIncludesDessert(Boolean includesDessert) { this.includesDessert = includesDessert; }
    public String getItemsSummary() { return itemsSummary; }
    public void setItemsSummary(String itemsSummary) { this.itemsSummary = itemsSummary; }
    public String getPopularBadge() { return popularBadge; }
    public void setPopularBadge(String popularBadge) { this.popularBadge = popularBadge; }
}
