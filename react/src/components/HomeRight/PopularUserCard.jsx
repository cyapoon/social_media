import { Avatar, Button, CardHeader } from '@mui/material'
import { red } from '@mui/material/colors'
import React from 'react'

const PopularUserCard = () => {
  return (
    <div>
        <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} >
            R
          </Avatar>
        }
        action={
          <Button size='small'>follow</Button>
        }
        title="Username"
        subheader="@username"
      />
    </div>
  )
}

export default PopularUserCard