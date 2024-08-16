package com.bookhaven.api.services;

import com.bookhaven.api.domain.User;
import com.bookhaven.api.dtos.UserDto;
import com.bookhaven.api.exceptions.BhAuthException;
import com.bookhaven.api.exceptions.BhResourceNotFoundException;

public interface UserService {
    User validateUser(String email, String password) throws BhAuthException;
    User registerUser(String firstName, String lastName, String email, String password) throws BhAuthException;
    UserDto getUserById(Integer userId);
    UserDto updateUserDetails(Integer userId, String firstName, String lastName, String aboutMe);
}
