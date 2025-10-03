package com.social_media.demo.repository;

import com.social_media.demo.models.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Integer> {
    public List<Message> findByChatId(Integer chatId);
}
