package com.social_media.demo.controller;

import com.social_media.demo.config.JwtProvider;
import com.social_media.demo.models.User;
import com.social_media.demo.repository.UserRepository;
import com.social_media.demo.request.LoginRequest;
import com.social_media.demo.response.AuthResponse;
import com.social_media.demo.service.impl.CustomerUserDetailsService;
import com.social_media.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private CustomerUserDetailsService customerUserDetailsService;

    @PostMapping(value = "/signup", produces = "application/json")
    public AuthResponse CreateUser(@RequestBody User user) throws Exception {
        System.out.println(user);
        User isExist = userRepository.findByEmail(user.getEmail());
        if (isExist != null) {
            throw new Exception("email already used with another account");
        }
//        System.out.println(user);
        User newUser = new User();
        newUser.setEmail(user.getEmail());
        newUser.setFirstName(user.getFirstName());
        newUser.setLastName(user.getLastName());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(newUser);

        Authentication authentication = new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword());

        String token = JwtProvider.generateToken(authentication);

        AuthResponse res = new AuthResponse(token, "Register successful");
        return res;
    }

    @PostMapping("/signin")
    public AuthResponse signin(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticate(loginRequest.getEmail(), loginRequest.getPassword());
        String token = JwtProvider.generateToken(authentication);
        AuthResponse res = new AuthResponse(token, "Login successful");
        return res;
    }

    private Authentication authenticate(String email, String password) {
        UserDetails userDetails = customerUserDetailsService.loadUserByUsername(email);
        if(userDetails == null) {
            throw new BadCredentialsException("Invalid email");
        }
        if(!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("Invalid password");
        }
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }

}
