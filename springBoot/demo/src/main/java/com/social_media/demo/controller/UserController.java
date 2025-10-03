package com.social_media.demo.controller;

import com.social_media.demo.models.User;
import com.social_media.demo.repository.UserRepository;
import com.social_media.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {


    @Autowired
    private UserService userService;

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable("userId") Integer userId) throws Exception {
        User user = userService.findUserById(userId);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<User>> getUsers() {
        List<User> users = userService.findAllUsers();
        return ResponseEntity.ok(users);
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User savedUser = userService.register(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

    @PutMapping
    public ResponseEntity<User> updateUser(@RequestHeader("Authorization") String jwt,
                                           @RequestBody User user) throws Exception {
        User reqUser = userService.findUserByJwt(jwt);
        User u = userService.updateUser(user, reqUser.getId());
        return ResponseEntity.ok(u);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable("userId") Integer userId) throws Exception {
        String msg = userService.deleteUser(userId);
        return ResponseEntity.status(HttpStatus.OK).body(msg);
    }

    @PutMapping("/follow/{userId2}")
    public User followUserHandler(@RequestHeader("Authorization") String jwt,
                                  @PathVariable Integer userId2) throws Exception {
        User reqUser = userService.findUserByJwt(jwt);
        User user = userService.followUser(reqUser.getId(), userId2);
        return user;
    }

    @GetMapping("/search")
    public List<User> searchUser(@RequestParam("query") String query) {
        List<User> users = userService.searchUser(query);
        return users;
    }

    @GetMapping("/profile")
    public User getUserFromToken(@RequestHeader("Authorization") String jwt) {
//        System.out.println("jwt: " + jwt);
        User user = userService.findUserByJwt(jwt);
        return user;
    }

}
