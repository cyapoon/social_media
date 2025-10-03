package com.social_media.demo.service;

import com.social_media.demo.models.Post;
import com.social_media.demo.models.User;

import java.util.List;

public interface PostService {
    Post createNewPost(Post post, Integer userId) throws Exception;

    String deletePost(Integer postId, Integer userId) throws Exception;

    Post save(Post post);

    List<Post> findPostByUserId(Integer userId);

    Post findPostById(Integer postId) throws Exception;

    List<Post> findAllPost();

    Post savedPost(Integer postId, Integer userId) throws Exception;

    Post likePost(Integer postId, Integer userId) throws Exception;

    List<Post> findPostsSavedByUser(Integer userId);
}
