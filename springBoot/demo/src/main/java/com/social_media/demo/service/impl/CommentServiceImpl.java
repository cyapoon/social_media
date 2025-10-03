package com.social_media.demo.service.impl;

import com.social_media.demo.models.Comment;
import com.social_media.demo.models.Post;
import com.social_media.demo.models.User;
import com.social_media.demo.repository.CommentRepository;
import com.social_media.demo.service.CommentService;
import com.social_media.demo.service.PostService;
import com.social_media.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private PostService postService;

    @Override
    public Comment createComment(Comment comment, Integer postId, Integer userId) throws Exception {
        User user = userService.findUserById(userId);
        Post post = postService.findPostById(postId);
        comment.setUser(user);
        comment.setContent(comment.getContent());
        comment.setCreatedAt(LocalDateTime.now());
        Comment savedComment = commentRepository.save(comment);

        post.getComments().add(comment);
        postService.save(post);
        return savedComment;
    }

    @Override
    public Comment getCommentById(Integer commentId) throws Exception {
        Optional<Comment> opt = commentRepository.findById(commentId);
        if(opt.isEmpty()){
            throw new Exception("Comment not exist");
        }
        return opt.get();
    }

    @Override
    public Comment likeComment(Integer commentId, Integer userId) throws Exception {
        User user = userService.findUserById(userId);
        Comment comment = getCommentById(commentId);
        if(!comment.getLikes().contains(user)){
            comment.getLikes().add(user);
        } else {
            comment.getLikes().remove(user);
        }
        return commentRepository.save(comment);
    }
}
