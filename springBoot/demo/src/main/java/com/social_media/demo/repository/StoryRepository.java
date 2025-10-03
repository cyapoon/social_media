package com.social_media.demo.repository;

import com.social_media.demo.models.Story;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface StoryRepository extends CrudRepository<Story, Integer> {
    public List<Story> findByUserId(Integer userId);
}
