package com.social_media.demo.service;

import com.social_media.demo.exceptions.UserException;
import com.social_media.demo.models.User;

import java.util.List;

public interface UserService {
    public User register(User user);
    public User findUserById(Integer userId) throws UserException;
    public User findUserByEmail(String email);
    public User followUser(Integer userId1, Integer userId2) throws UserException;
    public User updateUser(User user, Integer userId) throws UserException;
    public List<User> searchUser(String query);
    public List<User> findAllUsers();
    public String deleteUser(Integer userId) throws UserException;
    public User findUserByJwt(String jwt);

}
