package com.bookhaven.api.services;

import com.bookhaven.api.domain.User;
import com.bookhaven.api.dtos.UserDto;
import com.bookhaven.api.exceptions.BhAuthException;
import com.bookhaven.api.exceptions.BhResourceNotFoundException;
import com.bookhaven.api.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.regex.Pattern;

@Service
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User validateUser(String email, String password) throws BhAuthException {
        if(email != null) email = email.toLowerCase();
        return userRepository.findByEmailAndPassword(email, password);
    }

    @Override
    public User registerUser(String firstName, String lastName, String email, String password) throws BhAuthException {
        Pattern pattern = Pattern.compile("^(.+)@(.+)$");
        if(email != null) email = email.toLowerCase();
        if(!pattern.matcher(email).matches())
            throw new BhAuthException("Invalid email format");
        Integer count = userRepository.getCountByEmail(email);
        if(count > 0) {
            throw new BhAuthException("Email Already in user");
        }
        Integer userId = userRepository.create(firstName, lastName, email, password);
        return userRepository.findById(userId);
    }

    @Override
    public UserDto getUserById(Integer userId) {
        User user = userRepository.findById(userId);

        return new UserDto(
                user.getUserId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getAdmin(),
                user.getDateJoined(),
                user.getAboutMe()
        );
    }

    @Override
    public UserDto updateUserDetails(Integer userId, String firstName, String lastName, String aboutMe) {
        User user = userRepository.updateUserDetails(userId, firstName, lastName, aboutMe);

        return new UserDto(
                user.getUserId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getAdmin(),
                user.getDateJoined(),
                user.getAboutMe()
        );
    }
}
