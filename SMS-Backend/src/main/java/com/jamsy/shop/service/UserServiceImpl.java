package com.jamsy.shop.service;

import com.jamsy.shop.entity.Role;
import com.jamsy.shop.entity.User;
import com.jamsy.shop.model.UserModel;
import com.jamsy.shop.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {


    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;


    @Override
    public User registerUser(UserModel userModel) {
        User user = new User();
        user.setEmail(userModel.getEmail());
        user.setFirstName(userModel.getEmail());
        user.setLastName(userModel.getLastName());
        user.setRole(Role.valueOf(userModel.getRole()));
        user.setPassword(passwordEncoder.encode(userModel.getPassword()));
        user.setPhoneNumber(userModel.getPhoneNumber());
        userRepository.save(user);
        return user;
    }


}

