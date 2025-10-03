import { Avatar, Box, Button, Card, Tab, Tabs } from '@mui/material';
import React, { use, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PostCard from '../Post/PostCard';
import UserReelCard from '../Reels/UserReelCard';
import { useDispatch, useSelector } from 'react-redux';
import ProfileModal from './ProfileModal';
import { getSavedPostAction, getUsersPostAction } from '../../Redux/Post/post.action';

const tabs = [
  { value: "post", name: "Post" },
  { value: "reels", name: "Reels" },
  { value: "saved", name: "Saved" },
  { value: "repost", name: "Repost" },

]

const posts = [1, 2, 3, 4]

const reels = [1, 2, 3, 4]

const savedPost = [1, 1, 1]

function Profile() {

  const [open, setOpen] = React.useState(false);
  const handleOpenProfileModal = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { auth, post } = useSelector(store => store)
  const [value, setValue] = React.useState('post');
  const handleChange = (event, newValue) => {
    
    setValue(newValue);
  }

  useEffect(() => {
    dispatch(getUsersPostAction(auth.user.id))
    dispatch(getSavedPostAction())
  },[])

  const dispatch = useDispatch()

  console.log("auth in profile", auth)
  console.log("post in profile", post)

  return (
    <Card className='my-10 w-[70%]'>
      <div className='rounded-md'>
        <div className='h-[15rem]'>
          <img className='w-full h-full rounded-t-md'
            src="https://cdn.pixabay.com/photo/2014/01/13/20/01/pebbles-243910_1280.jpg"
          />
        </div>

        <div className='px-5 flex justify-between items-start mt-5 h-[5rem]'>
          <Avatar
            className='transform -translate-y-24'
            sx={{ width: "10rem", height: "10rem" }}
          />

          {true 
          ? <Button onClick={handleOpenProfileModal} sx={{ borderRadius: "20px" }} variant="outlined">Edit Profile</Button> 
          : <Button>Follow</Button>}

        </div>

        <div className='p-5'>
          <h1 className='py-1 font-bold text-xl'>{auth?.user.firstName + " " + auth?.user.lastName}</h1>
          <p>@{auth?.user.firstName.toLowerCase() + "_" + auth?.user.lastName.toLowerCase()}</p>

          <div className='flex gap-2 items-center py-3'>

            <span>{post.posts.length} post</span>
            <span>{auth.user.followers.length} followers</span>
            <span>{auth.user.followings.length} followings</span>

          </div>

          <div>
            <p>
              This is my bio...
            </p>
          </div>
        </div>



        <section>
          <Box sx={{ width: 100 % Avatar, borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="wrapped label tabs example"
            >
              {tabs.map((item, index) => <Tab key={index} value={item.value} label={item.name} />)}
            </Tabs>

          </Box>

          <div className='flex justify-center'>
            {
              value === 'post' ?
                (
                  <div className='space-y-5 w-[70%] my-10'>
                    {
                      post.posts.map((item, index) =>
                        <div key={index} className='border border-slate-100 rounded-md'>
                          <PostCard item={item} />
                        </div>
                      )
                    }
                  </div>
                ) : value === 'reels' ?
                  <div className='flex flex-wrap gap-2 justify-center my-10'>
                    {reels.map(() => <UserReelCard />)}
                  </div> : value === 'saved' ?
                    <div className='space-y-5 w-[70%] my-10'>
                      {
                        post.savedPost.map((item, index) =>
                          <div key={index} className='border border-slate-100 rounded-md'>
                            <PostCard item={item} />
                          </div>
                        )
                      }
                    </div> :
                    <div>
                      Repost
                    </div>

            }
          </div>

        </section>

      </div>

      <section>
        <ProfileModal open={open} handleClose={handleClose} />
      </section>
    </Card>
  )
}

export default Profile