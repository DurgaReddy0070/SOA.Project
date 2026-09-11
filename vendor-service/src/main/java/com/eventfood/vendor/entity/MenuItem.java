package com.eventfood.vendor.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "menu_items")
public class MenuItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vendor_id", nullable = false)
    @JsonIgnore
    private Vendor vendor;

    private Long packageId;

    @Column(nullable = false)
    private String name;

    private String category; // STARTER, MAIN_COURSE, BREAD_RICE, DESSERT, BEVERAGE, LIVE_COUNTER

    private String dietaryType; // VEG, NON_VEG, VEGAN, JAIN, GLUTEN_FREE

    private Double price; // Add-on or unit price per person

    @Column(length = 500)
    private String description;

    private Boolean isChefSpecial;

    public MenuItem() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Vendor getVendor() { return vendor; }
    public void setVendor(Vendor vendor) { this.vendor = vendor; }

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
