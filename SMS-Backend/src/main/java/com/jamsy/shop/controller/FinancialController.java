package com.jamsy.shop.controller;

import com.jamsy.shop.entity.Financial;
import com.jamsy.shop.service.FinancialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/financial")
public class FinancialController {

    
        @Autowired
        private FinancialService financialService;

        @GetMapping
        public ResponseEntity<List<Financial>> getAllFinancials() {
            List<Financial> financials = financialService.getAllFinancials();
            return new ResponseEntity<>(financials, HttpStatus.OK);
        }

        @GetMapping("/{id}")
        public ResponseEntity<Financial> getFinancialById(@PathVariable Long id) {
            Optional<Financial> financial = financialService.getFinancialById(id);
            return financial.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
        }

        @PostMapping
        public ResponseEntity<Financial> createFinancial(@RequestBody Financial financial) {
            Financial savedFinancial = financialService.saveFinancial(financial);
            return new ResponseEntity<>(savedFinancial, HttpStatus.CREATED);
        }

        @PutMapping("/{id}")
        public ResponseEntity<Financial> updateFinancial(@PathVariable Long id, @RequestBody Financial financialDetails) {
            Optional<Financial> existingFinancial = financialService.getFinancialById(id);

            if (existingFinancial.isPresent()) {
                Financial financial = existingFinancial.get();
                financial.setOrderID(financialDetails.getOrderID());
                financial.setEmail(financialDetails.getEmail());
                financial.setPaymentMethod(financialDetails.getPaymentMethod());
                financial.setPaymentStatus(financialDetails.getPaymentStatus());
                financial.setAmount(financialDetails.getAmount());
                financial.setMoneyReceived(financialDetails.getMoneyReceived());

                Financial updatedFinancial = financialService.saveFinancial(financial);
                return new ResponseEntity<>(updatedFinancial, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }

        @DeleteMapping("/{id}")
        public ResponseEntity<Void> deleteFinancial(@PathVariable Long id) {
            Optional<Financial> financial = financialService.getFinancialById(id);

            if (financial.isPresent()) {
                financialService.deleteFinancial(id);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }

}
