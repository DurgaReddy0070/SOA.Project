package com.eventfood.auth.config;

import com.eventfood.auth.entity.Role;
import com.eventfood.auth.entity.User;
import com.eventfood.auth.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initUsers(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (userRepository.count() == 0) {
                // 1. Event Organizer Account
                User organizer = new User();
                organizer.setName("Durga Prasad Reddy");
                organizer.setEmail("organizer@eventfood.com");
                organizer.setPassword(passwordEncoder.encode("organizer123"));
                organizer.setPhone("+91 9876543210");
                organizer.setOrganization("KL University Event Committee");
                organizer.setRole(Role.ORGANIZER);
                organizer.setCreatedAt(LocalDateTime.now());
                userRepository.save(organizer);

                // 2. Vendor Account
                User vendor = new User();
                vendor.setName("Royal Feast Caterers");
                vendor.setEmail("vendor@eventfood.com");
                vendor.setPassword(passwordEncoder.encode("vendor123"));
                vendor.setPhone("+91 9123456780");
                vendor.setOrganization("Royal Feast Hospitality Pvt Ltd");
                vendor.setRole(Role.VENDOR);
                vendor.setCreatedAt(LocalDateTime.now());
                userRepository.save(vendor);

                // 3. Admin Account
                User admin = new User();
                admin.setName("SOA System Admin");
                admin.setEmail("admin@eventfood.com");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setPhone("+91 9988776655");
                admin.setOrganization("KLH CSE SOA Cell");
                admin.setRole(Role.ADMIN);
                admin.setCreatedAt(LocalDateTime.now());
                userRepository.save(admin);

                // 4. Student Account
                User student = new User();
                student.setName("Toram Charam");
                student.setEmail("charam@eventfood.com");
                student.setPassword(passwordEncoder.encode("charam123"));
                student.setPhone("+91 9440112233");
                student.setOrganization("KL University");
                student.setRole(Role.ORGANIZER);
                student.setCreatedAt(LocalDateTime.now());
                userRepository.save(student);

                System.out.println(">>> Demo users initialized successfully in Auth Service DB");
            }
        };
    }
}
