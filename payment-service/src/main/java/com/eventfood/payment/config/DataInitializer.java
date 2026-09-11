package com.eventfood.payment.config;

import com.eventfood.payment.entity.PaymentMethod;
import com.eventfood.payment.entity.PaymentStatus;
import com.eventfood.payment.entity.PaymentTransaction;
import com.eventfood.payment.repository.PaymentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initPayments(PaymentRepository paymentRepository) {
        return args -> {
            if (paymentRepository.count() == 0) {
                // Transaction 1: Tech Symposium Order
                PaymentTransaction t1 = new PaymentTransaction();
                t1.setTransactionId("TXN-2026-0814-9921");
                t1.setOrderId(1L);
                t1.setOrderNumber("EFM-2026-0814");
                t1.setOrganizerId(1L);
                t1.setAmount(191835.0);
                t1.setPaymentMethod(PaymentMethod.UPI);
                t1.setStatus(PaymentStatus.SUCCESS);
                t1.setGatewayReference("UPI-HDFC-9928120349");
                t1.setInvoiceNumber("INV-EFM-10024");
                t1.setNotes("Payment completed via UPI auto-debit. Confirmation SMS & Email triggered.");
                t1.setTimestamp(LocalDateTime.now().minusHours(4));
                paymentRepository.save(t1);

                // Transaction 2: Corporate Summit Order
                PaymentTransaction t2 = new PaymentTransaction();
                t2.setTransactionId("TXN-2026-0815-4432");
                t2.setOrderId(2L);
                t2.setOrderNumber("EFM-2026-0815");
                t2.setOrganizerId(2L);
                t2.setAmount(86184.0);
                t2.setPaymentMethod(PaymentMethod.CORPORATE_INVOICE);
                t2.setStatus(PaymentStatus.SUCCESS);
                t2.setGatewayReference("CORP-NET-66520119");
                t2.setInvoiceNumber("INV-EFM-10025");
                t2.setNotes("Corporate Net-30 approved invoice transaction.");
                t2.setTimestamp(LocalDateTime.now().minusHours(6));
                paymentRepository.save(t2);

                System.out.println(">>> Sample Transactions initialized in Payment Service DB");
            }
        };
    }
}
