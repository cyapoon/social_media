import { Avatar } from '@mui/material'
import React from 'react'

function StoryCircle() {
    return (
        <div>
            <div className='flex flex-col items-center mr-4 cursor-pointer'>
                <Avatar
                    sx={{ width: "4rem", height: "4rem" }}
                    src='https://cdn.pixabay.com/photo/2018/01/21/14/16/woman-3096664_640.jpg'
                >

                </Avatar>
                <p>code</p>
            </div>
        </div>
    )
}

export default StoryCircle