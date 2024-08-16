package com.bookhaven.api.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class BhAuthException extends RuntimeException{

    public BhAuthException(String message){ super(message); }
}
