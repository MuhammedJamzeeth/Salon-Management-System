package com.jamsy.shop.controller;

import com.jamsy.shop.entity.Contact;
import com.jamsy.shop.entity.Employee;
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
    public ResponseEntity<Contact> createContact(
            @RequestParam("name") String name,
            @RequestParam("email") String email,
            @RequestParam("phoneNumber") String phoneNumber,
            @RequestParam("message") String message) {

        Contact contact = new Contact();
        contact.setName(name);
        contact.setEmail(email);
        contact.setPhoneNumber(phoneNumber);
        contact.setMessage(message);

        Contact savedContact = contactService.saveContact(contact);
        return ResponseEntity.ok(savedContact);
    }

    @GetMapping("/contacts")
    public ResponseEntity<List<Contact>> fetchContactList(){
        List<Contact> emp = contactRepository.findAll();
        return ResponseEntity.ok(emp);
    }


}
