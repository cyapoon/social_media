package com.social_media.demo.repository;

import com.social_media.demo.models.Reels;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ReelsRepository extends CrudRepository<Reels, Integer> {

    public List<Reels> findByUserId(Integer userId);
}
