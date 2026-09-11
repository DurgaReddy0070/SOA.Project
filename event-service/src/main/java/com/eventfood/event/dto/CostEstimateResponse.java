package com.eventfood.event.dto;

public class CostEstimateResponse {
    private Integer guestCount;
    private Double basePricePerPlate;
    private Double addonsPerPlate;
    private Double effectiveRatePerPlate;
    private Double totalFoodCost;
    private Double bulkDiscountAmount;
    private Double bulkDiscountPercent;
    private Double serviceAndLogisticsFee;
    private Double taxGst;
    private Double grandTotal;
    private Integer recommendedBufferPlates;
    private String tierApplied;

    public CostEstimateResponse() {}

    public Integer getGuestCount() { return guestCount; }
    public void setGuestCount(Integer guestCount) { this.guestCount = guestCount; }

    public Double getBasePricePerPlate() { return basePricePerPlate; }
    public void setBasePricePerPlate(Double basePricePerPlate) { this.basePricePerPlate = basePricePerPlate; }

    public Double getAddonsPerPlate() { return addonsPerPlate; }
    public void setAddonsPerPlate(Double addonsPerPlate) { this.addonsPerPlate = addonsPerPlate; }

    public Double getEffectiveRatePerPlate() { return effectiveRatePerPlate; }
    public void setEffectiveRatePerPlate(Double effectiveRatePerPlate) { this.effectiveRatePerPlate = effectiveRatePerPlate; }

    public Double getTotalFoodCost() { return totalFoodCost; }
    public void setTotalFoodCost(Double totalFoodCost) { this.totalFoodCost = totalFoodCost; }

    public Double getBulkDiscountAmount() { return bulkDiscountAmount; }
    public void setBulkDiscountAmount(Double bulkDiscountAmount) { this.bulkDiscountAmount = bulkDiscountAmount; }

    public Double getBulkDiscountPercent() { return bulkDiscountPercent; }
    public void setBulkDiscountPercent(Double bulkDiscountPercent) { this.bulkDiscountPercent = bulkDiscountPercent; }

    public Double getServiceAndLogisticsFee() { return serviceAndLogisticsFee; }
    public void setServiceAndLogisticsFee(Double serviceAndLogisticsFee) { this.serviceAndLogisticsFee = serviceAndLogisticsFee; }

    public Double getTaxGst() { return taxGst; }
    public void setTaxGst(Double taxGst) { this.taxGst = taxGst; }

    public Double getGrandTotal() { return grandTotal; }
    public void setGrandTotal(Double grandTotal) { this.grandTotal = grandTotal; }

    public Integer getRecommendedBufferPlates() { return recommendedBufferPlates; }
    public void setRecommendedBufferPlates(Integer recommendedBufferPlates) { this.recommendedBufferPlates = recommendedBufferPlates; }

    public String getTierApplied() { return tierApplied; }
    public void setTierApplied(String tierApplied) { this.tierApplied = tierApplied; }
}
