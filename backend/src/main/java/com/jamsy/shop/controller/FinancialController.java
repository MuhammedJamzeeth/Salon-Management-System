package com.jamsy.shop.controller;

import com.jamsy.shop.entity.Financial;
import com.jamsy.shop.service.FinancialReportService;
import com.jamsy.shop.service.FinancialService;
import net.sf.jasperreports.engine.JRException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.FileNotFoundException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/financial")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class FinancialController {

    
        @Autowired
        private FinancialService financialService;

        @Autowired
        private FinancialReportService reportService;

        @GetMapping
        public ResponseEntity<List<Financial>> getAllFinancials() {
            List<Financial> financials = financialService.getAllFinancials();
            return new ResponseEntity<>(financials, HttpStatus.OK);
        }

        @GetMapping("/total-amount")
        public ResponseEntity<Double> getFinancial() {
            Double financial = financialService.getTotalAmount();

            return new ResponseEntity<>(financial, HttpStatus.OK);
        }

        @PostMapping
        public ResponseEntity<Financial> createFinancial(@RequestBody Financial financial) {
            Financial savedFinancial = financialService.saveFinancial(financial);
            return new ResponseEntity<>(savedFinancial, HttpStatus.CREATED);
        }

        @PutMapping("/{id}")
        public Financial updateFinancial(@PathVariable Long id, @RequestBody Financial financialDetail) {
            return financialService.updateMoneyReceived(id, financialDetail.getMoneyReceived(), financialDetail.getPaymentStatus());
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

    @GetMapping("/report")
    public ResponseEntity<byte[]> getFinancialReport() {
        try {
            List<Financial> records = financialService.getAllFinancials();
            byte[] report = reportService.generateReport(records);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("attachment", "financial_report.pdf");

            return ResponseEntity.ok().headers(headers).body(report);
        } catch (JRException | FileNotFoundException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

}
