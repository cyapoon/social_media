package com.social_media.demo.controller;

import com.social_media.demo.models.Post;
import com.social_media.demo.models.User;
import com.social_media.demo.response.ApiResponse;
import com.social_media.demo.service.PostService;
import com.social_media.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {
    @Autowired
    PostService postService;

    @Autowired
    UserService userService;

    @PostMapping
    public ResponseEntity<Post> createPost(@RequestHeader("Authorization") String jwt,
                                           @RequestBody Post post) throws Exception {

        User reqUser = userService.findUserByJwt(jwt);
        Post createdPost = postService.createNewPost(post, reqUser.getId());

        return new ResponseEntity<>(createdPost, HttpStatus.CREATED);
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<ApiResponse> deletePost(@RequestHeader("Authorization") String jwt,
                                                  @PathVariable Integer postId) throws Exception {
        User reqUser = userService.findUserByJwt(jwt);
        String message = postService.deletePost(postId, reqUser.getId());
        ApiResponse res = new ApiResponse(message, true);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping("/{postId}")
    public ResponseEntity<Post> findPostByIdHandler(@PathVariable Integer postId) throws Exception {
        Post post = postService.findPostById(postId);

        return new ResponseEntity<Post>(post, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Post>> findUsersPost(@PathVariable Integer userId){
        List<Post> posts = postService.findPostByUserId(userId);
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Post>> findAllPost(){
        List<Post> posts = postService.findAllPost();
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    @PutMapping("/save/{postId}")
    public ResponseEntity<Post> savedPostHandler(@RequestHeader("Authorization") String jwt,
                                                 @PathVariable Integer postId) throws Exception {
        User reqUser = userService.findUserByJwt(jwt);
        Post post = postService.savedPost(postId, reqUser.getId());
        return new ResponseEntity<Post>(post, HttpStatus.ACCEPTED);
    }

    @PutMapping("/like/{postId}")
    public ResponseEntity<Post> likePostHandler(@RequestHeader("Authorization") String jwt,
                                                @PathVariable Integer postId) throws Exception {
        User reqUser = userService.findUserByJwt(jwt);
        Post post = postService.likePost(postId, reqUser.getId());
        return new ResponseEntity<Post>(post, HttpStatus.ACCEPTED);
    }

    @GetMapping("/saved")
    public ResponseEntity<List<Post>> getSavedPosts(@RequestHeader("Authorization") String jwt) throws Exception {
        User reqUser = userService.findUserByJwt(jwt);
        List<Post> savedPosts = postService.findPostsSavedByUser(reqUser.getId());
        return new ResponseEntity<>(savedPosts, HttpStatus.OK);
    }


}
