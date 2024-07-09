package com.jamsy.shop.service;

import com.jamsy.shop.entity.Contact;
import com.jamsy.shop.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


public interface ContactService {

    public Contact saveContact(Contact contact) ;
}
