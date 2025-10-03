package com.social_media.demo.controller;

import com.social_media.demo.models.Chat;
import com.social_media.demo.models.User;
import com.social_media.demo.request.CreateChatRequest;
import com.social_media.demo.service.ChatService;
import com.social_media.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chats")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @Autowired
    private UserService userService;

    @PostMapping
    public Chat createChat(@RequestHeader("Authorization") String jwt,
                           @RequestBody CreateChatRequest req) throws Exception {
        User reqUser = userService.findUserByJwt(jwt);
        User user2 = userService.findUserById(req.getUserId());
        Chat chat = chatService.createChat(reqUser, user2);
        return chat;

    }

    @GetMapping
    public List<Chat> findUsersChat(@RequestHeader("Authorization") String jwt) {
        User user = userService.findUserByJwt(jwt);
        List<Chat> chats = chatService.findUsersChat(user.getId());
        return chats;
    }
}
