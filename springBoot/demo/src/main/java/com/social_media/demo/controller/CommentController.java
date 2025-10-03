package com.social_media.demo.controller;

import com.social_media.demo.models.Comment;
import com.social_media.demo.models.User;
import com.social_media.demo.service.CommentService;
import com.social_media.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/comments")
public class CommentController {
    @Autowired
    private CommentService commentService;

    @Autowired
    private UserService userService;

    @PostMapping("/post/{postId}")
    public Comment createComment(@RequestHeader("Authorization") String jwt,
                                 @RequestBody Comment comment,
                                 @PathVariable("postId") Integer postId) throws Exception {
        User user = userService.findUserByJwt(jwt);
        Comment createdComment = commentService.createComment(comment, postId, user.getId());
        return createdComment;
    }

    @PutMapping("/like/{commentId}")
    public Comment likeComment(@RequestHeader("Authorization") String jwt,
                                 @PathVariable("commentId") Integer commentId) throws Exception {
        User user = userService.findUserByJwt(jwt);
        Comment likeComment = commentService.likeComment(commentId, user.getId());
        return likeComment;
    }
}
