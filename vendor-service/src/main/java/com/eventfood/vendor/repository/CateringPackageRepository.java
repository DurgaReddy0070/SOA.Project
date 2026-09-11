package com.eventfood.vendor.repository;

import com.eventfood.vendor.entity.CateringPackage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CateringPackageRepository extends JpaRepository<CateringPackage, Long> {
    List<CateringPackage> findByVendorId(Long vendorId);
    List<CateringPackage> findByPackageType(String packageType);
}
