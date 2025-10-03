package com.social_media.demo.service;

import com.social_media.demo.models.Comment;

public interface CommentService {
    public Comment createComment(Comment comment,
                                 Integer postId,
                                 Integer userId) throws Exception;
    public Comment getCommentById(Integer commentId) throws Exception;
    public Comment likeComment(Integer commentId, Integer userId) throws Exception;
}
