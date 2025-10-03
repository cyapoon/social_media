package com.social_media.demo.service;

import com.social_media.demo.models.Chat;
import com.social_media.demo.models.User;

import java.util.List;

public interface ChatService {
    public Chat createChat(User reqUser, User user2);
    public Chat findChatById(Integer chatId) throws Exception;
    public List<Chat> findUsersChat(Integer userId);
}
