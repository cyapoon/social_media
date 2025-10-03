package com.social_media.demo.controller;


import com.social_media.demo.models.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class RealTimeChat {
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/chat/{groupId}")
    public Message sendToUser(@Payload Message message,
                              @DestinationVariable String groupId) {
        System.out.println("Sending message to group " + groupId);
        simpMessagingTemplate.convertAndSendToUser(groupId, "/private", message);
        return message;
    }
}
