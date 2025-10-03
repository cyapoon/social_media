package com.social_media.demo.service;

import com.social_media.demo.models.Story;
import com.social_media.demo.models.User;

import java.util.List;

public interface StoryService {
    public Story creatStory(Story story, User user);
    public List<Story> findStoryByUserId(Integer userId) throws Exception;
}
