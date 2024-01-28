package com.jamsy.shop.controller;

import com.jamsy.shop.entity.User;
import com.jamsy.shop.event.RegistrationCompleteEvent;
import com.jamsy.shop.model.UserModel;
import com.jamsy.shop.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEvent;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RegistrationController {

    private final UserService userService;

    public RegistrationController(UserService userService) {
        this.userService = userService;
    }

    @Autowired
    private ApplicationEventPublisher applicationEventPublisher;

    @PostMapping("/register")
    public String registerUser(@RequestBody UserModel userModel){
        User user = userService.registerUser(userModel);
        applicationEventPublisher.publishEvent(new RegistrationCompleteEvent(user,"url"));
        return "Success";
    }

}
