package com.jamsy.shop.event;

import com.jamsy.shop.entity.User;
import org.springframework.context.ApplicationEvent;

public class RegistrationCompleteEvent extends ApplicationEvent {
    private User user;
    private String applicationUrl;
    public RegistrationCompleteEvent(User user,String applicationUrl) {
        super(user);
    }
}
