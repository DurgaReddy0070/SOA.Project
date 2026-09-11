package com.eventfood.vendor.controller;

import com.eventfood.vendor.dto.*;
import com.eventfood.vendor.service.VendorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/vendors")
@CrossOrigin(origins = "*")
public class VendorController {

    private final VendorService vendorService;

    public VendorController(VendorService vendorService) {
        this.vendorService = vendorService;
    }

    @GetMapping
    public ResponseEntity<List<VendorDto>> getAllVendors(
            @RequestParam(required = false) String cuisine,
            @RequestParam(required = false) String city) {
        return ResponseEntity.ok(vendorService.getAllVendors(cuisine, city));
    }

    @GetMapping("/{id}")
    public ResponseEntity<VendorDto> getVendorById(@PathVariable Long id) {
        return ResponseEntity.ok(vendorService.getVendorById(id));
    }

    @PostMapping
    public ResponseEntity<VendorDto> createVendor(@RequestBody VendorDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(vendorService.createVendor(dto));
    }

    @GetMapping("/{id}/packages")
    public ResponseEntity<List<CateringPackageDto>> getPackagesByVendor(@PathVariable Long id) {
        return ResponseEntity.ok(vendorService.getPackagesByVendor(id));
    }

    @GetMapping("/packages/all")
    public ResponseEntity<List<CateringPackageDto>> getAllPackages() {
        return ResponseEntity.ok(vendorService.getAllPackages());
    }

    @PostMapping("/{id}/packages")
    public ResponseEntity<CateringPackageDto> addPackage(@PathVariable Long id, @RequestBody CateringPackageDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(vendorService.addPackage(id, dto));
    }

    @GetMapping("/{id}/menu-items")
    public ResponseEntity<List<MenuItemDto>> getMenuItems(
            @PathVariable Long id,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String dietaryType) {
        return ResponseEntity.ok(vendorService.getMenuItemsByVendor(id, category, dietaryType));
    }

    @PostMapping("/{id}/menu-items")
    public ResponseEntity<MenuItemDto> addMenuItem(@PathVariable Long id, @RequestBody MenuItemDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(vendorService.addMenuItem(id, dto));
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        Map<String, String> status = new HashMap<>();
        status.put("service", "vendor-service");
        status.put("status", "UP");
        return ResponseEntity.ok(status);
    }
}
