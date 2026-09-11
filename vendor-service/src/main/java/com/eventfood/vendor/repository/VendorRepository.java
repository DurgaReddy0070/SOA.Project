package com.eventfood.vendor.repository;

import com.eventfood.vendor.entity.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VendorRepository extends JpaRepository<Vendor, Long> {
    List<Vendor> findByCityIgnoreCase(String city);

    @Query("SELECT v FROM Vendor v WHERE LOWER(v.cuisineTypes) LIKE LOWER(CONCAT('%', :cuisine, '%'))")
    List<Vendor> findByCuisine(@Param("cuisine") String cuisine);

    List<Vendor> findByIsAvailableTrue();
}
