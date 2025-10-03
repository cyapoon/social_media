import React, { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import MiddlePart from '../../components/MiddlePart/MiddlePart'
import Reels from '../../components/Reels/Reels'
import CreateReelsForm from '../../components/Reels/CreateReelsForm'
import Sidebar from '../../components/SideBar/Sidebar'
import Profile from '../../components/Profile/Profile'
import { Grid } from '@mui/material'
import HomeRight from '../../components/HomeRight/HomeRight'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileAction } from '../../Redux/Auth/auth.action'

function HomePage() {
    const dispatch = useDispatch()
    const location = useLocation()

    const jwt = localStorage.getItem("jwt")
    const {auth} = useSelector(state => state)

    console.log("auth in homepage", auth)

    useEffect(() => {
        dispatch(getProfileAction(jwt))
    }, [jwt])

    return (
        <div className='px-20'>
            <Grid container spacing={0}>
                <Grid size={{xs:4, lg:3}}>
                    <div className='sticky top-0'>
                        <Sidebar />
                    </div>
                </Grid>
                <Grid className='px-5 flex justify-center' size={{xs:6, lg: location.pathname==="/" ? 6 : 9}}>
                    <Routes>
                        <Route path="/" element={<MiddlePart />} />
                        <Route path="/reels" element={<Reels />} />
                        <Route path="/create-reels" element={<CreateReelsForm />} />
                        <Route path="/profile" element={<Profile/>} />

                    </Routes>
                </Grid>
                {location.pathname==="/" &&  <Grid size={{xs:2 ,lg: 3}} className="relative">
                    <div className='sticky top-0 w-full'>
                        <HomeRight />
                    </div>
                </Grid>}
            </Grid>
        </div>
    )
}

export default HomePage