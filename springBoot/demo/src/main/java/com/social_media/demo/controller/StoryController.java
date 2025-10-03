package com.social_media.demo.controller;

import com.social_media.demo.models.Story;
import com.social_media.demo.models.User;
import com.social_media.demo.service.StoryService;
import com.social_media.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/story")
public class StoryController {

    @Autowired
    private StoryService storyService;

    @Autowired
    private UserService userService;

    @PostMapping
    public Story createStory(@RequestBody Story story, @RequestHeader("Authorization") String jwt) {
        User reqUser = userService.findUserByJwt(jwt);
        Story createStory = storyService.creatStory(story, reqUser);
        return createStory;
    }

    @GetMapping("/user/{userId}")
    public List<Story> findUserStory(@PathVariable Integer userId,
                                     @RequestHeader("Authorization") String jwt) throws Exception {
        User reqUser = userService.findUserByJwt(jwt);
        List<Story> stories = storyService.findStoryByUserId(userId);
        return stories;
    }
}
