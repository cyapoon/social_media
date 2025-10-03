package com.social_media.demo.controller;

import com.social_media.demo.models.Message;
import com.social_media.demo.models.User;
import com.social_media.demo.service.MessageService;
import com.social_media.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/message")
public class MessageController {
    @Autowired
    private MessageService messageService;

    @Autowired
    private UserService userService;

    @PostMapping("/chat/{chatId}")
    public Message createMessage(@RequestBody Message req,
                                 @RequestHeader("authorization") String jwt,
                                 @PathVariable Integer chatId) throws Exception {
        User user = userService.findUserByJwt(jwt);
        Message message = messageService.createMessage(user, chatId, req);
        return message;
    }

    @GetMapping("/chat/{chatId}")
    public List<Message> findChatMessage(@RequestHeader("Authorization") String jwt,
                                         @PathVariable Integer chatId) throws Exception {
        User user = userService.findUserByJwt(jwt);
        List<Message> messages = messageService.getChatsMessages(chatId);
        return messages;
    }
}
