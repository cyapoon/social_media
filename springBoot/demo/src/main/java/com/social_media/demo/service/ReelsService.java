package com.social_media.demo.service;

import com.social_media.demo.models.Reels;
import com.social_media.demo.models.User;

import java.util.List;

public interface ReelsService {
    public Reels createReel(Reels reel, User user);
    public List<Reels> findAllReels();
    public List<Reels> findUsersReel(Integer id) throws Exception;
}
