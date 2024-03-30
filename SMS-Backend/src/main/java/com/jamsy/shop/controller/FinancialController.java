package com.jamsy.shop.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FinancialController {

    @GetMapping("/financial")
    public String getReport(){
        return "report";
    }

}
