package com.social_media.demo.service;

import com.social_media.demo.models.Chat;
import com.social_media.demo.models.Message;
import com.social_media.demo.models.User;

import java.util.List;

public interface MessageService {
    public Message createMessage(User user, Integer chatId, Message req) throws Exception;
    public List<Message> getChatsMessages(Integer chatId) throws Exception;
}
