package com.eventfood.vendor.repository;

import com.eventfood.vendor.entity.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
    List<MenuItem> findByVendorId(Long vendorId);
    List<MenuItem> findByPackageId(Long packageId);
    List<MenuItem> findByVendorIdAndCategory(Long vendorId, String category);
    List<MenuItem> findByVendorIdAndDietaryType(Long vendorId, String dietaryType);
}
