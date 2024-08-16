package com.bookhaven.api.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class BhResourceNotFoundException extends RuntimeException{

    public BhResourceNotFoundException(String message){ super(message); }
}
