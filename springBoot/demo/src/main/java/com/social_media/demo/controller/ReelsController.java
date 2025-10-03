package com.social_media.demo.controller;

import com.social_media.demo.models.Reels;
import com.social_media.demo.models.User;
import com.social_media.demo.service.ReelsService;
import com.social_media.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reels")
public class ReelsController {
    @Autowired
    private ReelsService reelsService;
    @Autowired
    private UserService userService;

    @PostMapping
    public Reels createReels(@RequestBody Reels reels, @RequestHeader("Authorization") String jwt) {

        User reqUser = userService.findUserByJwt(jwt);
        Reels createReels = reelsService.createReel(reels, reqUser);
        return createReels;
    }

    @GetMapping
    public List<Reels> findAllReels() {
        return reelsService.findAllReels();
    }

    @GetMapping("/user/{userId}")
    public List<Reels> getAllReels(@PathVariable("userId") Integer userId) throws Exception {
        List<Reels> reels = reelsService.findUsersReel(userId);
        return reels;
    }

}
