package com.social_media.demo.service.impl;

import com.social_media.demo.models.Reels;
import com.social_media.demo.models.User;
import com.social_media.demo.repository.ReelsRepository;
import com.social_media.demo.repository.UserRepository;
import com.social_media.demo.service.ReelsService;
import com.social_media.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReelsServiceImpl implements ReelsService {

    @Autowired
    private ReelsRepository reelsRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;

    @Override
    public Reels createReel(Reels reel, User user) {
        Reels newReel = new Reels();
        newReel.setTitle(reel.getTitle());
        newReel.setUser(user);
        newReel.setVideo(reel.getVideo());
        return reelsRepository.save(newReel);
    }

    @Override
    public List<Reels> findAllReels() {
        return (List<Reels>) reelsRepository.findAll();
    }

    @Override
    public List<Reels> findUsersReel(Integer id) throws Exception {
        userService.findUserById(id);
        return reelsRepository.findByUserId(id);
    }
}
