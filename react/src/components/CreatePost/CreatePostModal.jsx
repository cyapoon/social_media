import { Avatar, Backdrop, Box, Button, CircularProgress, IconButton, Modal, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import ImageIcon from '@mui/icons-material/Image';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { uploadToCloudnary } from '../../utils/uploadToCloudnary';
import { useDispatch } from 'react-redux';
import { createPostAction } from '../../Redux/Post/post.action';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: ".6rem",
  outline: "none",
};

const CreatePostModal = ({ handleClose, open }) => {

  const [selectedImage, setSelectedImage] = useState();
  const [selectedVideo, setSelectedVideo] = useState();
  const [isloading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSelectImage = async (event) => {
    setIsLoading(true)
    try {
      const imageUrl = await uploadToCloudnary(event.target.files[0], "image")
      setSelectedImage(imageUrl)
      formik.setFieldValue("image", imageUrl)
      setIsLoading(false)
    } catch (error) {
      console.error("Image upload failed:", error)
      setIsLoading(false)
    }
  }
  const handleSelectVideo = async(event) => {
    setIsLoading(true)
    try {
      const videoUrl = await uploadToCloudnary(event.target.files[0], "video")
      setSelectedVideo(videoUrl)
      formik.setFieldValue("video", videoUrl)
      setIsLoading(false)
    } catch (error) {
      console.error("Video upload failed:", error)
      setIsLoading(false)
    }
  }

  const formik = useFormik({
    initialValues: {
      caption: "",
      image: "",
      video: ""
    },
    onSubmit: (values) => {
      console.log("formik values", values)
      dispatch(createPostAction(values))
      handleClose();
    }
  });


  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={formik.handleSubmit}>
          <div className='flex space-x-4 items-center'>
            <Avatar />
            <div>
              <p className='font-bold text-lg'>User Name</p>
              <p className='text-sm'>@username</p>
            </div>
          </div>

          <textarea
            className='outlined-none w-full mt-5 p-2 bg-transparent border border-[#3b4054] rounded-sm'
            placeholder='write caption...'
            onChange={formik.handleChange}
            name='caption'
            id=''
            value={formik.values.caption}
            rows={4}></textarea>

          <div className='flex space-x-5 items-center mt-5'>
            <div>
              <input type='file'
                accept='image/*'
                onChange={handleSelectImage}
                style={{ display: "none" }}
                id='image-input' />
              <label htmlFor='image-input'>
                <IconButton color="primary" component="span">
                  <ImageIcon />
                  <span className='text-xl'>Image</span>
                </IconButton>
              </label>
              
            </div>

            <div>
              <input type='file'
                accept='video/*'
                onChange={handleSelectVideo}
                style={{ display: "none" }}
                id='video-input' />
              <label htmlFor='video-input'>
                <IconButton color="primary">
                  <VideoCallIcon />
                  <span className='text-xl'>Video</span>
                </IconButton>
              </label>
              
            </div>
          </div>

          {selectedImage && <div>
            <img className='h-[10rem]' src={selectedImage} alt='' />
          </div>}

          {selectedVideo && <div>
            <video className='h-[10rem]' src={selectedVideo} controls />
          </div>}

          <div className='flex w-full justify-end'>
            <Button variant='contained' type='submit' sx={{ borderRadius: "1.5rem" }}>Post</Button>
          </div>


        </form>
        <Backdrop
          sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
          open={isloading}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </Modal>
  )
}

export default CreatePostModal