package com.jamsy.shop.listener;

import com.jamsy.shop.event.RegistrationCompleteEvent;
import org.springframework.context.ApplicationListener;

public class RegistrationCompleteListener implements ApplicationListener<RegistrationCompleteEvent> {
    @Override
    public void onApplicationEvent(RegistrationCompleteEvent event) {
        //Create the verification token for the user with link

        //Send mail to use
    }
}
