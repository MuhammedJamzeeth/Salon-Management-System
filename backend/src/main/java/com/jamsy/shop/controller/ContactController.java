package com.jamsy.shop.controller;

import com.jamsy.shop.entity.Contact;
import com.jamsy.shop.entity.Employee;
import com.jamsy.shop.entity.ServiceEntity;
import com.jamsy.shop.repository.ContactRepository;
import com.jamsy.shop.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ContactController {

    @Autowired
    private ContactService contactService;
    @Autowired
    private ContactRepository contactRepository;

    @PostMapping("/contact")
    public ResponseEntity<Contact> saveContact(@RequestBody Contact contact) {
        try {
            Contact contact1 = contactService.saveContact(contact);
            return ResponseEntity.ok(contact1);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/contacts")
    public ResponseEntity<List<Contact>> fetchContactList(){
        List<Contact> emp = contactRepository.findAll();
        return ResponseEntity.ok(emp);
    }


}
