package com.eventfood.vendor.config;

import com.eventfood.vendor.entity.CateringPackage;
import com.eventfood.vendor.entity.MenuItem;
import com.eventfood.vendor.entity.Vendor;
import com.eventfood.vendor.repository.CateringPackageRepository;
import com.eventfood.vendor.repository.MenuItemRepository;
import com.eventfood.vendor.repository.VendorRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initVendors(
            VendorRepository vendorRepository,
            CateringPackageRepository packageRepository,
            MenuItemRepository menuItemRepository) {
        return args -> {
            if (vendorRepository.count() == 0) {
                // Vendor 1: Royal Feast Grand Caterers
                Vendor v1 = new Vendor();
                v1.setName("Royal Feast Grand Caterers");
                v1.setDescription("Premier luxury event caterer specializing in grand Hyderabadi biryani feasts, royal Mughlai dishes, and live gourmet counters.");
                v1.setCuisineTypes("Hyderabadi, Mughlai, North Indian, Desserts");
                v1.setRating(4.9);
                v1.setRatingCount(340);
                v1.setCity("Hyderabad");
                v1.setAddress("Plot 42, Jubilee Hills, Road No. 36, Hyderabad");
                v1.setPhone("+91 9876500001");
                v1.setEmail("contact@royalfeast.com");
                v1.setMinGuests(50);
                v1.setMaxGuests(2500);
                v1.setLogoUrl("https://images.unsplash.com/photo-1555244162-803834f70033?w=150");
                v1.setBannerUrl("https://images.unsplash.com/photo-1519741497674-611481863552?w=800");
                v1.setIsVerified(true);
                v1.setIsAvailable(true);
                v1 = vendorRepository.save(v1);

                // Packages for Vendor 1
                CateringPackage p1_1 = new CateringPackage();
                p1_1.setVendor(v1);
                p1_1.setName("Shahi Nizami Royal Banquet");
                p1_1.setDescription("Full 7-course royal feast with authentic Dum Biryani, Galouti Kebabs, Live Roomali Roti counter, and Double Ka Meetha.");
                p1_1.setPackageType("PREMIUM_WEDDING");
                p1_1.setPricePerPerson(850.0);
                p1_1.setMinGuests(100);
                p1_1.setIncludesBeverages(true);
                p1_1.setIncludesLiveCounters(true);
                p1_1.setIncludesDessert(true);
                p1_1.setItemsSummary("3 Starters + 2 Live Counters + Mutton Dum Biryani + Paneer Butter Masala + Mirchi Ka Salan + 3 Desserts");
                p1_1.setPopularBadge("Most Popular for Weddings");
                packageRepository.save(p1_1);

                CateringPackage p1_2 = new CateringPackage();
                p1_2.setVendor(v1);
                p1_2.setName("Executive Grand Corporate Buffet");
                p1_2.setDescription("Balanced corporate feast designed for quick high-volume service with hot holding units.");
                p1_2.setPackageType("EXECUTIVE_CORPORATE");
                p1_2.setPricePerPerson(580.0);
                p1_2.setMinGuests(50);
                p1_2.setIncludesBeverages(true);
                p1_2.setIncludesLiveCounters(false);
                p1_2.setIncludesDessert(true);
                p1_2.setItemsSummary("2 Starters + Chicken Biryani / Veg Pulao + Dal Makhani + Butter Naan + Gulab Jamun & Ice Cream");
                p1_2.setPopularBadge("Top Rated Corporate");
                packageRepository.save(p1_2);

                // Menu items for Vendor 1
                addMenuItem(menuItemRepository, v1, p1_1.getId(), "Hyderabadi Zafrani Mutton Dum Biryani", "MAIN_COURSE", "NON_VEG", 320.0, "Slow-cooked fragrant basmati rice with tender spiced mutton", true);
                addMenuItem(menuItemRepository, v1, p1_1.getId(), "Paneer Tikka Angara", "STARTER", "VEG", 140.0, "Charcoal-grilled cottage cheese marinated in hung curd and tandoori spices", false);
                addMenuItem(menuItemRepository, v1, p1_1.getId(), "Galouti Kebab with Sheermal", "STARTER", "NON_VEG", 180.0, "Melt-in-mouth minced meat kebab served with saffron infused sheermal", true);
                addMenuItem(menuItemRepository, v1, p1_1.getId(), "Dal Makhani Peshawari", "MAIN_COURSE", "VEG", 120.0, "Slow simmered black lentils overnight with butter and cream", false);
                addMenuItem(menuItemRepository, v1, p1_1.getId(), "Shahi Tukda with Rabdi", "DESSERT", "VEG", 90.0, "Crispy fried bread soaked in saffron syrup topped with rich pistachio rabdi", true);
                addMenuItem(menuItemRepository, v1, p1_1.getId(), "Live Jalebi & Rabdi Counter", "LIVE_COUNTER", "VEG", 80.0, "Fresh hot crispy jalebis made live for guests", true);


                // Vendor 2: Dakshin Flavours Banquets
                Vendor v2 = new Vendor();
                v2.setName("Dakshin Flavours Banquets");
                v2.setDescription("Authentic South Indian banana leaf & modern buffet catering with specialized Andhra, Telangana, Chettinad, and Udupi dishes.");
                v2.setCuisineTypes("South Indian, Andhra, Chettinad, Traditional");
                v2.setRating(4.8);
                v2.setRatingCount(290);
                v2.setCity("Hyderabad");
                v2.setAddress("Near Hitec City MMTS, Madhapur, Hyderabad");
                v2.setPhone("+91 9876500002");
                v2.setEmail("info@dakshinflavours.com");
                v2.setMinGuests(40);
                v2.setMaxGuests(1800);
                v2.setLogoUrl("https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=150");
                v2.setBannerUrl("https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800");
                v2.setIsVerified(true);
                v2.setIsAvailable(true);
                v2 = vendorRepository.save(v2);

                CateringPackage p2_1 = new CateringPackage();
                p2_1.setVendor(v2);
                p2_1.setName("Traditional Dakshin Banana Leaf Mahabhojanam");
                p2_1.setDescription("Traditional sit-down or buffet meal with 18 authentic varieties served on banana leaves.");
                p2_1.setPackageType("STANDARD_BUFFET");
                p2_1.setPricePerPerson(490.0);
                p2_1.setMinGuests(75);
                p2_1.setIncludesBeverages(true);
                p2_1.setIncludesLiveCounters(true);
                p2_1.setIncludesDessert(true);
                p2_1.setItemsSummary("Gutti Vankaya + Natukodi Pulao / Bagara Rice + Sambar + Rasam + Poori + Gongura Pachadi + Payasam");
                p2_1.setPopularBadge("Authentic South Indian");
                packageRepository.save(p2_1);

                addMenuItem(menuItemRepository, v2, p2_1.getId(), "Gutti Vankaya Kura", "MAIN_COURSE", "VEG", 110.0, "Stuffed brinjal curry in a rich peanut and sesame gravy", true);
                addMenuItem(menuItemRepository, v2, p2_1.getId(), "Andhra Natukodi Vepudu", "STARTER", "NON_VEG", 190.0, "Country chicken fry tossed with crushed pepper and curry leaves", true);
                addMenuItem(menuItemRepository, v2, p2_1.getId(), "Live Dosa & Appam Station", "LIVE_COUNTER", "VEG", 95.0, "Hot dosas, appams and stew prepared live", true);
                addMenuItem(menuItemRepository, v2, p2_1.getId(), "Semiyan Elaneer Payasam", "DESSERT", "VEG", 75.0, "Tender coconut and vermicelli payasam infused with cardamom", false);


                // Vendor 3: Green Leaf Organic & Jain Kitchen
                Vendor v3 = new Vendor();
                v3.setName("Green Leaf Pure Veg & Jain Kitchen");
                v3.setDescription("100% Pure Vegetarian, Jain-compliant, and Vegan certified catering for auspicious events, religious functions, and eco-friendly galas.");
                v3.setCuisineTypes("Pure Vegetarian, Jain Special, North Indian, Gujarati, Marwari");
                v3.setRating(4.95);
                v3.setRatingCount(410);
                v3.setCity("Hyderabad");
                v3.setAddress("Secunderabad Banquet Hub, Hyderabad");
                v3.setPhone("+91 9876500003");
                v3.setEmail("orders@greenleafcatering.in");
                v3.setMinGuests(30);
                v3.setMaxGuests(3000);
                v3.setLogoUrl("https://images.unsplash.com/photo-1540420773420-3366772f4999?w=150");
                v3.setBannerUrl("https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800");
                v3.setIsVerified(true);
                v3.setIsAvailable(true);
                v3 = vendorRepository.save(v3);

                CateringPackage p3_1 = new CateringPackage();
                p3_1.setVendor(v3);
                p3_1.setName("Satvik Shrestha Jain & Veg Utsav");
                p3_1.setDescription("Prepared with strict no-root vegetable adherence for Jain items, organic ingredients, and zero artificial colors.");
                p3_1.setPackageType("PREMIUM_WEDDING");
                p3_1.setPricePerPerson(620.0);
                p3_1.setMinGuests(50);
                p3_1.setIncludesBeverages(true);
                p3_1.setIncludesLiveCounters(true);
                p3_1.setIncludesDessert(true);
                p3_1.setItemsSummary("Khandvi + Raw Banana Tikki + Shahi Paneer Jain + Rajasthani Dal Baati Churma + Malpua Rabdi");
                p3_1.setPopularBadge("100% Pure Veg & Jain");
                packageRepository.save(p3_1);

                addMenuItem(menuItemRepository, v3, p3_1.getId(), "Jain Shahi Paneer (No Onion/Garlic)", "MAIN_COURSE", "JAIN", 150.0, "Creamy tomato & cashew gravy with cottage cheese prepared without onion or garlic", true);
                addMenuItem(menuItemRepository, v3, p3_1.getId(), "Raw Banana Galouti Tikki", "STARTER", "JAIN", 120.0, "Spiced raw plantain patties pan-fried in pure ghee", true);
                addMenuItem(menuItemRepository, v3, p3_1.getId(), "Vegan Quinoa Veg Bowl", "MAIN_COURSE", "VEGAN", 130.0, "Organic tri-color quinoa tossed with Mediterranean vegetables and lemon dressing", false);
                addMenuItem(menuItemRepository, v3, p3_1.getId(), "Live Chaat Counter (Pani Puri & Dahi Bhalla)", "LIVE_COUNTER", "VEG", 90.0, "Hygienic automatic pani puri dispenser and freshly mixed dahi bhalla", true);


                // Vendor 4: Urban Wok & Continental Catering
                Vendor v4 = new Vendor();
                v4.setName("Urban Wok & Continental Catering");
                v4.setDescription("Modern global fusion catering offering Live Pasta, Asian Dim Sum Stations, Gourmet Pizzas, and European Charcuterie.");
                v4.setCuisineTypes("Continental, Pan-Asian, Italian, Mexican, Gourmet Salads");
                v4.setRating(4.75);
                v4.setRatingCount(180);
                v4.setCity("Hyderabad");
                v4.setAddress("Gachibowli Financial District, Hyderabad");
                v4.setPhone("+91 9876500004");
                v4.setEmail("contact@urbanwok.com");
                v4.setMinGuests(25);
                v4.setMaxGuests(1200);
                v4.setLogoUrl("https://images.unsplash.com/photo-1544025162-d76694265947?w=150");
                v4.setBannerUrl("https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800");
                v4.setIsVerified(true);
                v4.setIsAvailable(true);
                v4 = vendorRepository.save(v4);

                CateringPackage p4_1 = new CateringPackage();
                p4_1.setVendor(v4);
                p4_1.setName("Global Fusion & Live Pasta Experience");
                p4_1.setDescription("Perfect for modern celebrations, cocktail evenings, and youthful tech gatherings.");
                p4_1.setPackageType("EXECUTIVE_CORPORATE");
                p4_1.setPricePerPerson(720.0);
                p4_1.setMinGuests(40);
                p4_1.setIncludesBeverages(true);
                p4_1.setIncludesLiveCounters(true);
                p4_1.setIncludesDessert(true);
                p4_1.setItemsSummary("Dim Sum Basket + Live Wood-Fired Pizza + Penne Alfredo / Arbiata + Tiramisu & Churros");
                p4_1.setPopularBadge("Trendy & Modern");
                packageRepository.save(p4_1);

                addMenuItem(menuItemRepository, v4, p4_1.getId(), "Live Artisanal Pasta Counter", "LIVE_COUNTER", "VEG", 140.0, "Choice of Penne/Fettuccine in Alfredo, Pesto or Arrabbiata sauce with custom toppings", true);
                addMenuItem(menuItemRepository, v4, p4_1.getId(), "Steamed Edamame & Truffle Dim Sum", "STARTER", "VEGAN", 160.0, "Crystal dumplings packed with edamame and water chestnuts drizzled with truffle oil", true);
                addMenuItem(menuItemRepository, v4, p4_1.getId(), "Smoked Herb Chicken Steaks", "MAIN_COURSE", "NON_VEG", 220.0, "Grilled chicken breast in rosemary jus with garlic mashed potatoes", false);
                addMenuItem(menuItemRepository, v4, p4_1.getId(), "Classic Italian Tiramisu", "DESSERT", "VEG", 110.0, "Espresso soaked savoiardi with whipped mascarpone cream", true);

                System.out.println(">>> Sample Catering Vendors & Menus initialized in Vendor Service DB");
            }
        };
    }

    private void addMenuItem(
            MenuItemRepository repo, Vendor v, Long pkgId, String name, String category,
            String dietary, Double price, String desc, Boolean special) {
        MenuItem item = new MenuItem();
        item.setVendor(v);
        item.setPackageId(pkgId);
        item.setName(name);
        item.setCategory(category);
        item.setDietaryType(dietary);
        item.setPrice(price);
        item.setDescription(desc);
        item.setIsChefSpecial(special);
        repo.save(item);
    }
}
