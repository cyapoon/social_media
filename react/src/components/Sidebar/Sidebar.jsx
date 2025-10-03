import React from 'react'
import { navigationMenu } from './SidebarNavigation'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'
import { Button, Card, Menu, MenuItem } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUserAction } from '../../Redux/Auth/auth.action';

function Sidebar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {auth} = useSelector(store => store)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setAnchorEl(null);
    localStorage.removeItem("jwt")
    dispatch(logoutUserAction())
    navigate('/login')
  }
  const handleNavigate = (item) =>{
    if(item.title==="Profile") {
      navigate(`/profile`)
    } else {
      navigate(item.path)
    }
  }

  return (
    <Card className='card h-screen flex flex-col justify-between py-5'>
      <div className='space-y-8 pl-5'>
        <div className=''>
          <span className='logo font-bold text-xl'>Social Media</span>
        </div>
        <div className='space-y-8'>
          {navigationMenu.map((item, index) =>
            <div onClick={()=>(handleNavigate(item))} key={index} className='flex space-x-3 items-center cursor-pointer'>
              {item.icon}
              <p className='text-xl'>{item.title}</p>
            </div>
          )}
        </div>
      </div>
      <div>
        <Divider />
        <div className='pl-5 flex items-center justify-between pt-5'>
          <div className='flex items-center space-x-3'>
            <Avatar src='https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png' />
            <div>
              <p className='font-bold'>{auth?.user.firstName + " " + auth?.user.lastName}</p>
              <p className='opacity-70'>@{auth?.user.firstName.toLowerCase() + "_" + auth?.user.lastName.toLowerCase()}</p>
            </div>
          </div>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <MoreHorizIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              list: {
                'aria-labelledby': 'basic-button',
              },
            }}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </Card>
  )
}

export default Sidebar