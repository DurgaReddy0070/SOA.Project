package com.eventfood.vendor.service;

import com.eventfood.vendor.dto.*;
import com.eventfood.vendor.entity.*;
import com.eventfood.vendor.repository.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class VendorService {

    private final VendorRepository vendorRepository;
    private final CateringPackageRepository packageRepository;
    private final MenuItemRepository menuItemRepository;

    public VendorService(VendorRepository vendorRepository,
                         CateringPackageRepository packageRepository,
                         MenuItemRepository menuItemRepository) {
        this.vendorRepository = vendorRepository;
        this.packageRepository = packageRepository;
        this.menuItemRepository = menuItemRepository;
    }

    public List<VendorDto> getAllVendors(String cuisine, String city) {
        List<Vendor> vendors;
        if (cuisine != null && !cuisine.isEmpty()) {
            vendors = vendorRepository.findByCuisine(cuisine);
        } else if (city != null && !city.isEmpty()) {
            vendors = vendorRepository.findByCityIgnoreCase(city);
        } else {
            vendors = vendorRepository.findAll();
        }

        return vendors.stream()
                .map(this::mapToVendorDto)
                .collect(Collectors.toList());
    }

    public VendorDto getVendorById(Long id) {
        Vendor vendor = vendorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vendor not found with id: " + id));
        return mapToVendorDto(vendor);
    }

    public VendorDto createVendor(VendorDto dto) {
        Vendor vendor = new Vendor();
        vendor.setName(dto.getName());
        vendor.setDescription(dto.getDescription());
        vendor.setCuisineTypes(dto.getCuisineTypes());
        vendor.setRating(dto.getRating() != null ? dto.getRating() : 5.0);
        vendor.setRatingCount(dto.getRatingCount() != null ? dto.getRatingCount() : 1);
        vendor.setCity(dto.getCity());
        vendor.setAddress(dto.getAddress());
        vendor.setPhone(dto.getPhone());
        vendor.setEmail(dto.getEmail());
        vendor.setMinGuests(dto.getMinGuests() != null ? dto.getMinGuests() : 25);
        vendor.setMaxGuests(dto.getMaxGuests() != null ? dto.getMaxGuests() : 2000);
        vendor.setLogoUrl(dto.getLogoUrl());
        vendor.setBannerUrl(dto.getBannerUrl());
        vendor.setIsVerified(dto.getIsVerified() != null ? dto.getIsVerified() : true);
        vendor.setIsAvailable(dto.getIsAvailable() != null ? dto.getIsAvailable() : true);

        Vendor saved = vendorRepository.save(vendor);
        return mapToVendorDto(saved);
    }

    public List<CateringPackageDto> getPackagesByVendor(Long vendorId) {
        Vendor vendor = vendorRepository.findById(vendorId)
                .orElseThrow(() -> new RuntimeException("Vendor not found with id: " + vendorId));
        return packageRepository.findByVendorId(vendorId).stream()
                .map(p -> mapToPackageDto(p, vendor.getName()))
                .collect(Collectors.toList());
    }

    public List<CateringPackageDto> getAllPackages() {
        return packageRepository.findAll().stream()
                .map(p -> mapToPackageDto(p, p.getVendor() != null ? p.getVendor().getName() : "Partner Caterer"))
                .collect(Collectors.toList());
    }

    public CateringPackageDto addPackage(Long vendorId, CateringPackageDto dto) {
        Vendor vendor = vendorRepository.findById(vendorId)
                .orElseThrow(() -> new RuntimeException("Vendor not found with id: " + vendorId));

        CateringPackage pkg = new CateringPackage();
        pkg.setVendor(vendor);
        pkg.setName(dto.getName());
        pkg.setDescription(dto.getDescription());
        pkg.setPackageType(dto.getPackageType());
        pkg.setPricePerPerson(dto.getPricePerPerson());
        pkg.setMinGuests(dto.getMinGuests());
        pkg.setIncludesBeverages(dto.getIncludesBeverages());
        pkg.setIncludesLiveCounters(dto.getIncludesLiveCounters());
        pkg.setIncludesDessert(dto.getIncludesDessert());
        pkg.setItemsSummary(dto.getItemsSummary());
        pkg.setPopularBadge(dto.getPopularBadge());

        CateringPackage saved = packageRepository.save(pkg);
        return mapToPackageDto(saved, vendor.getName());
    }

    public List<MenuItemDto> getMenuItemsByVendor(Long vendorId, String category, String dietaryType) {
        if (category != null && !category.isEmpty()) {
            return menuItemRepository.findByVendorIdAndCategory(vendorId, category).stream()
                    .map(this::mapToMenuItemDto)
                    .collect(Collectors.toList());
        } else if (dietaryType != null && !dietaryType.isEmpty()) {
            return menuItemRepository.findByVendorIdAndDietaryType(vendorId, dietaryType).stream()
                    .map(this::mapToMenuItemDto)
                    .collect(Collectors.toList());
        }
        return menuItemRepository.findByVendorId(vendorId).stream()
                .map(this::mapToMenuItemDto)
                .collect(Collectors.toList());
    }

    public MenuItemDto addMenuItem(Long vendorId, MenuItemDto dto) {
        Vendor vendor = vendorRepository.findById(vendorId)
                .orElseThrow(() -> new RuntimeException("Vendor not found with id: " + vendorId));

        MenuItem item = new MenuItem();
        item.setVendor(vendor);
        item.setPackageId(dto.getPackageId());
        item.setName(dto.getName());
        item.setCategory(dto.getCategory());
        item.setDietaryType(dto.getDietaryType());
        item.setPrice(dto.getPrice());
        item.setDescription(dto.getDescription());
        item.setIsChefSpecial(dto.getIsChefSpecial());

        MenuItem saved = menuItemRepository.save(item);
        return mapToMenuItemDto(saved);
    }

    private VendorDto mapToVendorDto(Vendor v) {
        VendorDto dto = new VendorDto();
        dto.setId(v.getId());
        dto.setName(v.getName());
        dto.setDescription(v.getDescription());
        dto.setCuisineTypes(v.getCuisineTypes());
        dto.setRating(v.getRating());
        dto.setRatingCount(v.getRatingCount());
        dto.setCity(v.getCity());
        dto.setAddress(v.getAddress());
        dto.setPhone(v.getPhone());
        dto.setEmail(v.getEmail());
        dto.setMinGuests(v.getMinGuests());
        dto.setMaxGuests(v.getMaxGuests());
        dto.setLogoUrl(v.getLogoUrl());
        dto.setBannerUrl(v.getBannerUrl());
        dto.setIsVerified(v.getIsVerified());
        dto.setIsAvailable(v.getIsAvailable());
        if (v.getPackages() != null) {
            dto.setPackages(v.getPackages().stream()
                    .map(p -> mapToPackageDto(p, v.getName()))
                    .collect(Collectors.toList()));
        }
        if (v.getMenuItems() != null) {
            dto.setMenuItems(v.getMenuItems().stream()
                    .map(this::mapToMenuItemDto)
                    .collect(Collectors.toList()));
        }
        return dto;
    }

    private CateringPackageDto mapToPackageDto(CateringPackage p, String vendorName) {
        CateringPackageDto dto = new CateringPackageDto();
        dto.setId(p.getId());
        dto.setVendorId(p.getVendor() != null ? p.getVendor().getId() : null);
        dto.setVendorName(vendorName);
        dto.setName(p.getName());
        dto.setDescription(p.getDescription());
        dto.setPackageType(p.getPackageType());
        dto.setPricePerPerson(p.getPricePerPerson());
        dto.setMinGuests(p.getMinGuests());
        dto.setIncludesBeverages(p.getIncludesBeverages());
        dto.setIncludesLiveCounters(p.getIncludesLiveCounters());
        dto.setIncludesDessert(p.getIncludesDessert());
        dto.setItemsSummary(p.getItemsSummary());
        dto.setPopularBadge(p.getPopularBadge());
        return dto;
    }

    private MenuItemDto mapToMenuItemDto(MenuItem item) {
        MenuItemDto dto = new MenuItemDto();
        dto.setId(item.getId());
        dto.setVendorId(item.getVendor() != null ? item.getVendor().getId() : null);
        dto.setPackageId(item.getPackageId());
        dto.setName(item.getName());
        dto.setCategory(item.getCategory());
        dto.setDietaryType(item.getDietaryType());
        dto.setPrice(item.getPrice());
        dto.setDescription(item.getDescription());
        dto.setIsChefSpecial(item.getIsChefSpecial());
        return dto;
    }
}
