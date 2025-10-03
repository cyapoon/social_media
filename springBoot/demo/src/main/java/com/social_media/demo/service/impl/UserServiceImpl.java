package com.social_media.demo.service.impl;

import com.social_media.demo.config.JwtProvider;
import com.social_media.demo.exceptions.UserException;
import com.social_media.demo.models.User;
import com.social_media.demo.repository.UserRepository;
import com.social_media.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Override
    public User register(User user) {
        User newUser = new User();
        newUser.setEmail(user.getEmail());
        newUser.setFirstName(user.getFirstName());
        newUser.setLastName(user.getLastName());
        newUser.setPassword(user.getPassword());
        newUser.setId(user.getId());
        User savedUser = userRepository.save(newUser);
        return savedUser;
    }

    @Override
    public User findUserById(Integer userId) throws UserException {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {

            return user.get();
        }
        throw new UserException("user not exist with userid " + userId);
    }

    @Override
    public User findUserByEmail(String email) {
        User user = userRepository.findByEmail(email);
        return null;
    }

    @Override
    public User followUser(Integer reqUserId, Integer userId2) throws UserException {
        User reqUser = findUserById(reqUserId);
        User user2 = findUserById(userId2);

        user2.getFollowers().add(reqUser.getId());
        reqUser.getFollowings().add(user2.getId());

        userRepository.save(reqUser);
        userRepository.save(user2);
        return reqUser;
    }

    @Override
    public User updateUser(User user, Integer userId) throws UserException {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            throw new UserException("user not exist with userid " + userId);
        }
        User updatedUser = userOptional.get();
        if(user.getFirstName() != null){
            updatedUser.setFirstName(user.getFirstName());
        }
        if(user.getLastName() != null){
            updatedUser.setLastName(user.getLastName());
        }
        if(user.getEmail() != null){
            updatedUser.setEmail(user.getEmail());
        }
        if(user.getGender() != null){
            updatedUser.setGender(user.getGender());
        }
        userRepository.save(updatedUser);
        return updatedUser;
    }

    @Override
    public List<User> searchUser(String query) {
        List<User> users = userRepository.searchUser(query);
        return users;
    }

    @Override
    public List<User> findAllUsers() {
        List<User> users = userRepository.findAll();
        return users;
    }

    @Override
    public String deleteUser(Integer userId) throws UserException {
        userRepository.deleteById(userId);
        return "User deleted";
    }

    @Override
    public User findUserByJwt(String jwt) {
        String email = JwtProvider.getEmailFromJwtToken(jwt);
        User user = userRepository.findByEmail(email);
        return user;
    }

}
