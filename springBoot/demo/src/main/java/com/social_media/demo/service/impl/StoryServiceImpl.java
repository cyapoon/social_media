package com.social_media.demo.service.impl;

import com.social_media.demo.models.Story;
import com.social_media.demo.models.User;
import com.social_media.demo.repository.StoryRepository;
import com.social_media.demo.service.StoryService;
import com.social_media.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class StoryServiceImpl implements StoryService {

    @Autowired
    private StoryRepository storyRepository;

    @Autowired
    UserService userService;

    @Override
    public Story creatStory(Story story, User user) {
        Story createdStory = new Story();
        createdStory.setCaption(story.getCaption());
        createdStory.setImage(story.getImage());
        createdStory.setUser(user);
        createdStory.setTimestamp(LocalDateTime.now());
        return storyRepository.save(createdStory);
    }

    @Override
    public List<Story> findStoryByUserId(Integer userId) throws Exception {
        User user = userService.findUserById(userId);

        return storyRepository.findByUserId(userId);
    }
}
