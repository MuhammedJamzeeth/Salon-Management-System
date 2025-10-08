package com.jamsy.shop.service;

import com.jamsy.shop.entity.Financial;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class FinancialReportService {

    public byte[] generateReport(List<Financial> financialRecords) throws JRException, FileNotFoundException {
        // Load and compile the JasperReports template
        File file = ResourceUtils.getFile("classpath:FinancialReport.jrxml");
        JasperReport jasperReport = JasperCompileManager.compileReport(new FileInputStream(file));

        // Create a data source from the financial records
        JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(financialRecords);

        // Parameters for the report
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("createdBy", "Corner Salon");

        // Fill the report with data
        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);

        // Export the report to a byte array
        return JasperExportManager.exportReportToPdf(jasperPrint);
    }
}
