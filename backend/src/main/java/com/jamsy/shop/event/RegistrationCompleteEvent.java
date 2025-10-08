package com.jamsy.shop.event;

import com.jamsy.shop.entity.User;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.ApplicationEvent;

@Getter
@Setter
public class RegistrationCompleteEvent extends ApplicationEvent {
    private User user;
    private String applicationUrl;
    public RegistrationCompleteEvent(User user,String applicationUrl) {
        super(user);
    }
}
