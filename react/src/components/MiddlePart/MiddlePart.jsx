import Avatar from '@mui/material/Avatar'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import StoryCircle from './StoryCircle';
import { Card, IconButton } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import VideocamIcon from '@mui/icons-material/Videocam';
import ArticleIcon from '@mui/icons-material/Article';
import PostCard from '../Post/PostCard';
import CreatePostModal from '../CreatePost/CreatePostModal';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPostAction } from '../../Redux/Post/post.action';

function MiddlePart() {

  const dispatch = useDispatch()
  const { auth, post } = useSelector(state => state);
  const [openCreatePostModal, setOpenCreatePostModal] = useState(false)

  console.log("post in middlepart", post)

  const handleCloseCreatePostModal = () => {
    setOpenCreatePostModal(false)
  }

  const handleOpenCreatePostModal = () => setOpenCreatePostModal(true)

  const story = [1, 1, 1, 1, 1]



  useEffect(() => {
    dispatch(getAllPostAction())

  }, [dispatch, post.newComment, auth.user])

  return (
    <div className='px-20'>
      <section className='flex items-center p-5 rounded-b-md'>
        <div className='flex flex-col items-center mr-4 cursor-pointer'>
          <Avatar
            sx={{ width: "4rem", height: "4rem" }}>
            <AddIcon sx={{ fontSize: "3rem" }} />
          </Avatar>
          <p>New</p>
        </div>
        {story.map((ListItem, index) => <StoryCircle key={index} />)}
      </section>

      <Card className='p-5 mt-5'>
        <div className='flex justify-between'>
          <Avatar />
          <input
            onClick={handleOpenCreatePostModal}
            className='outline-none w-[90%] rounded-full px-5 bg-transparent border-[#3b4054] border'
            type='text'
            readOnly
          />
        </div>

        <div className='flex justify-center space-x-9 mt-5'>
          <div className='flex items-center'>
            <IconButton color='primary' onClick={handleOpenCreatePostModal}>
              <ImageIcon />
              <span className='text-xl'>Media</span>
            </IconButton>
            
          </div>

          <div className='flex items-center'>
            <IconButton color='primary' onClick={handleOpenCreatePostModal}>
              <VideocamIcon />
              <span className='text-xl'>Video</span>
            </IconButton>
            
          </div>

          <div className='flex items-center'>
            <IconButton color='primary' onClick={handleOpenCreatePostModal}>
              <ArticleIcon />
              <span className='text-xl'>Write Article</span>
            </IconButton>
            
          </div>
        </div>

      </Card>

      <div className='mt-5 space-y-5'>
        {post.posts.map((item, index) => <PostCard item={item} key={index} />)}

      </div>

      <div>
        <CreatePostModal handleClose={handleCloseCreatePostModal} open={openCreatePostModal} />
      </div>

    </div>
  )
}

export default MiddlePart