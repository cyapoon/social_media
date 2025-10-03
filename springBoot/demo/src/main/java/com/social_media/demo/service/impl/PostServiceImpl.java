package com.social_media.demo.service.impl;

import com.social_media.demo.models.Post;
import com.social_media.demo.models.User;
import com.social_media.demo.repository.PostRepository;
import com.social_media.demo.repository.UserRepository;
import com.social_media.demo.service.PostService;
import com.social_media.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PostServiceImpl implements PostService {

    @Autowired
    PostRepository postRepository;

    @Autowired
    UserService userService;
    @Autowired
    private UserRepository userRepository;

    @Override
    public Post createNewPost(Post post, Integer userId) throws Exception {
        User user = userService.findUserById(userId);

        Post newPost = new Post();
        newPost.setCaption(post.getCaption());
        newPost.setImage(post.getImage());
        newPost.setCreatedAt(LocalDateTime.now());
        newPost.setVideo(post.getVideo());
        newPost.setUser(user);
        return postRepository.save(newPost);
    }

    @Override
    public String deletePost(Integer postId, Integer userId) throws Exception {
        Post post = findPostById(postId);
        User user = userService.findUserById(userId);

        if(post.getUser().getId() != user.getId()) {
            throw new Exception("You are not allowed to delete this post");
        }
        postRepository.deleteById(postId);
        return "post deleted successfully.";
    }

    @Override
    public Post save(Post post) {
        postRepository.save(post);
        return post;
    }

    @Override
    public List<Post> findPostByUserId(Integer userId) {

        return postRepository.findPostByUserId(userId);
    }

    @Override
    public Post findPostById(Integer postId) throws Exception {
        Optional<Post> opt = postRepository.findById(postId);
        if(opt.isEmpty()){
            throw new Exception("post not found with id " + postId);
        }
        return opt.get();
    }

    @Override
    public List<Post> findAllPost() {
        return postRepository.findAll();
    }

    @Override
    public Post savedPost(Integer postId, Integer userId) throws Exception {
        Post post = this.findPostById(postId);
        User user = userService.findUserById(userId);

        if(post.getSaved().contains(user)) {
            post.getSaved().remove(user);
        } else {
            post.getSaved().add(user);
        }
        return postRepository.save(post);
    }

    @Override
    public Post likePost(Integer postId, Integer userId) throws Exception {
        Post post = this.findPostById(postId);
        User user = userService.findUserById(userId);

        if(post.getLiked().contains(user)) {
            post.getLiked().remove(user);
        } else {
            post.getLiked().add(user);
        }
        return postRepository.save(post);
    }

    @Override
    public List<Post> findPostsSavedByUser(Integer userId) {
        return postRepository.findPostsSavedByUserId(userId);
    }
}
