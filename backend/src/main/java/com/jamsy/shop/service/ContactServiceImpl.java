package com.jamsy.shop.service;

import com.jamsy.shop.entity.Contact;
import com.jamsy.shop.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactServiceImpl implements ContactService {

    @Autowired
    private ContactRepository contactRepository;
    @Override
    public Contact saveContact(Contact contact) {
        return contactRepository.save(contact);
    }

    @Override
    public List<Contact> fetchContactList() {
        return contactRepository.findAll();
    }
}
