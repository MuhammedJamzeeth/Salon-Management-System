package com.jamsy.shop.exception;

import lombok.NonNull;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import java.io.Serial;

public class NotFoundException extends ResponseStatusException {
    @Serial
    private static final long serialVersionUID = 7439642984069939024L;

    public NotFoundException(@NonNull final String message) {
        super(HttpStatus.NOT_FOUND, message);
    }
}
