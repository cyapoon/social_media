import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { red } from '@mui/material/colors';
import { createCommentAction, likePostAction, savePostAction } from '../../Redux/Post/post.action';
import { useDispatch, useSelector } from 'react-redux';
import { isLikedByReqUser } from '../../utils/isLikedByReqUser';
import { isSavedByReqUser } from '../../utils/isSavedByReqUser';


function PostCard({ item }) {
    console.log("item in postcard", item)
    const [showComments, setShowComments] = useState(false)
    const dispatch = useDispatch()
    const {auth ,post} = useSelector(state => state);
    console.log("post in postcard", post)

    const handleShowComment = () => setShowComments(!showComments)

    const handleCreateComment = (content) => {
        const reqData = {
            postId: item.id,
            data: {
                content
            }
        }
        dispatch(createCommentAction(reqData))
    }

    const handleLikePost = () => {
        dispatch(likePostAction(item.id))
    }
    const handleSavePost = () => {
        dispatch(savePostAction(item.id))
    }

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }}>
                        R
                    </Avatar>
                }
                action={
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                }
                title={item.user.firstName + " " + item.user.lastName}
                subheader={"@" + item.user.firstName + "-" + item.user.lastName}
            />

            <CardMedia
                component="img"
                height="194"
                image={item.image}
                alt="mountain"
            />

            <CardContent>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {item.caption}
                </Typography>
            </CardContent>

            <CardActions className='flex justify-between' disableSpacing>
                <div>
                    <IconButton onClick={handleLikePost}>
                        {isLikedByReqUser(auth.user.id, item) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>

                    <IconButton>
                        <ShareIcon />
                    </IconButton>

                    <IconButton onClick={handleShowComment}>
                        <ChatBubbleIcon />
                    </IconButton>

                </div>

                <div>
                    <IconButton onClick={handleSavePost}>
                        {isSavedByReqUser(auth.user.id, item) ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                    </IconButton>
                </div>
            </CardActions>

            {showComments && <section>
                <div className='flex items-center space-x-5 mx-3 my-5'>
                    <Avatar sx={{}} />
                    <input
                        className='w-full outline-none bg-transparent border border-[#3b4050] rounded-full px-5 py-2'
                        type='text'
                        placeholder='Write a comment...'
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && e.target.value) {
                                handleCreateComment(e.target.value)
                                console.log("comment value", e.target.value)
                            }
                        }}
                    />
                </div>
                <Divider />

                {item.comments.map((comment) => (
                    <div className='mx-3 space-y-2 my-5 text-xs'>

                        <div className='flex items-center space-x-5'>
                            <Avatar sx={{ height: "2rem", width: "2rem", fontSize: "0.8rem" }}>
                                {comment.user.firstName[0]}
                            </Avatar>

                            <p>{comment.content}</p>
                        </div>

                    </div>
                ))}


            </section>}

        </Card>
    )
}

export default PostCard