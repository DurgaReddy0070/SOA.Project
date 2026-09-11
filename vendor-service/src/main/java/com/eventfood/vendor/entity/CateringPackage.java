package com.eventfood.vendor.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "catering_packages")
public class CateringPackage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vendor_id", nullable = false)
    @JsonIgnore
    private Vendor vendor;

    @Column(nullable = false)
    private String name;

    @Column(length = 1000)
    private String description;

    private String packageType; // e.g. "PREMIUM_WEDDING", "EXECUTIVE_CORPORATE", "STANDARD_BUFFET", "HI_TEA"

    @Column(nullable = false)
    private Double pricePerPerson;

    private Integer minGuests;

    private Boolean includesBeverages;

    private Boolean includesLiveCounters;

    private Boolean includesDessert;

    @Column(length = 2000)
    private String itemsSummary; // Highlights of dishes included

    private String popularBadge;

    public CateringPackage() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Vendor getVendor() { return vendor; }
    public void setVendor(Vendor vendor) { this.vendor = vendor; }

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
