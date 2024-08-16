package com.bookhaven.api.repositories;

import com.bookhaven.api.domain.User;
import com.bookhaven.api.exceptions.BhAuthException;

public interface UserRepository {
    Integer create(String firstName, String lastName, String email, String password) throws BhAuthException;

    User findByEmailAndPassword(String email, String password) throws BhAuthException;

    Integer getCountByEmail(String email);

    User findById(Integer userId);

    User updateUserDetails(Integer userId, String firstName, String lastName, String aboutMe);
}
