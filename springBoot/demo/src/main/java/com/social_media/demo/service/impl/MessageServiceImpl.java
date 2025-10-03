package com.social_media.demo.service.impl;

import com.social_media.demo.models.Chat;
import com.social_media.demo.models.Message;
import com.social_media.demo.models.User;
import com.social_media.demo.repository.ChatRepository;
import com.social_media.demo.repository.MessageRepository;
import com.social_media.demo.service.ChatService;
import com.social_media.demo.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MessageServiceImpl implements MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private ChatService chatService;

    @Autowired
    private ChatRepository chatRepository;

    @Override
    public Message createMessage(User user, Integer chatId, Message req) throws Exception {
        Chat chat = chatService.findChatById(chatId);
        Message message = new Message();

        message.setChat(chat);
        message.setImage(req.getImage());
        message.setContent(req.getContent());
        message.setUser(user);
        message.setTimestamp(LocalDateTime.now());
        Message savedMessage = messageRepository.save(message);
        chat.getMessages().add(savedMessage);
        chatRepository.save(chat);
        return savedMessage;
    }

    @Override
    public List<Message> getChatsMessages(Integer chatId) throws Exception {
        Chat chat = chatService.findChatById(chatId);
        return messageRepository.findByChatId(chatId);
    }
}
