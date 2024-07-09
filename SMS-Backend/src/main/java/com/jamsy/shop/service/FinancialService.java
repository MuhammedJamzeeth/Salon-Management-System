package com.jamsy.shop.service;

import com.jamsy.shop.entity.Financial;
import com.jamsy.shop.repository.FinancialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FinancialService {

    @Autowired
    private FinancialRepository financialRepository;

    public List<Financial> getAllFinancials() {
        return financialRepository.findAll();
    }

    public Optional<Financial> getFinancialById(Long id) {
        return financialRepository.findById(id);
    }

    public Financial saveFinancial(Financial financial) {
        return financialRepository.save(financial);
    }

    public void deleteFinancial(Long id) {
        financialRepository.deleteById(id);
    }
}
