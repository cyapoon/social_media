import Grid from '@mui/material/Grid'
import React, { useEffect, useRef, useState } from 'react'
import WestIcon from '@mui/icons-material/West';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import AddCallIcon from '@mui/icons-material/AddCall';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SearchUser from '../../components/SearchUser/SearchUser';
import UserChatCard from './UserChatCard';
import ChatMessage from './ChatMessage';
import { useDispatch, useSelector } from 'react-redux';
import { createMessage, getAllChats } from '../../Redux/Message/message.action';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { uploadToCloudnary } from '../../utils/uploadToCloudnary';
import { Backdrop, CircularProgress } from '@mui/material';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { useNavigate } from 'react-router-dom';

function Message() {

  const dispatch = useDispatch();
  const { message, auth } = useSelector(store => store)
  const [currentChat, setCurrentChat] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getAllChats())
  }, [])

  useEffect(() => {
    if(message.message) {
      setMessages(prevMessages => {
        if(prevMessages.find(m => m.id === message.message.id)) {
          return prevMessages;
        }
        return [...prevMessages, message.message];
      });
    }
  }, [message.message])

  const handleSelectImage = async (event) => {
    console.log("selected image")
    setLoading(true)
    const imgUrl = await uploadToCloudnary(event.target.files[0], "image")
    console.log("imgUrl", imgUrl)
    setSelectedImage(imgUrl)
    console.log("selectedImage", selectedImage)
    setLoading(false)
  }

  const handleCreateMessage = (value) => {
    const message = {
      chatId: currentChat.id,
      content: value,
      image: selectedImage
    }
    console.log("create message", message)
    dispatch(createMessage({message,sendMessageToServer}))
  }

  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    try {
      const sock = new SockJS("http://localhost:5454/ws");
      const stomp = Stomp.over(sock);
      
      setStompClient(stomp);
      
      stomp.connect({}, onConnect, onErr);
      

      return () => {
        if (stomp && stomp.connected) {
          console.log("Disconnecting WebSocket");
          stomp.disconnect();
        }
      };
    } catch (error) {
      console.error("Error setting up WebSocket:", error);
    }
  },[])

  const onConnect = () => {
    console.log("connected to web socket")
  }

  const onErr = (err) => {
    console.log("err", err)
  }

  useEffect(() => {
    if(stompClient && auth.user && currentChat) {
      const subscription = stompClient.subscribe(`/user/${currentChat.id}/private`, onMessageReceive)
      

      return () => {
        if(subscription) {
          subscription.unsubscribe()
        }
      }
    }
  }, [stompClient, auth.user, currentChat])

  const sendMessageToServer = (newmessage) => {
    if(stompClient && newmessage) {
      stompClient.send(`/app/chat/${currentChat.id}`, {}, JSON.stringify(newmessage) )
    }

  }


  const onMessageReceive = (payload) => {
    console.log("received from websocket", payload);

      const receivedMessage = JSON.parse(payload.body);

      setMessages(prevMessages => {
        if(prevMessages.find(m => m.id === receivedMessage.id)) {
          return prevMessages;
        }
        return [...prevMessages, receivedMessage];
      });

  }

  useEffect(()=>{
    if(chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  },[messages])

  return (
    <div>
      <Grid container className="h-screen overflow-y-hidden">
        <Grid size={3} className="px-5">
          <div className='flex h-full justify-between space-x-2'>
            <div className='w-full'>
              <div className='flex space-x-4 items-center py-5'>
                <IconButton onClick={() => navigate("/")}>
                  <WestIcon />
                <h1 className='text-xl font-bold'>Home</h1>
                </IconButton>
                
              </div>

              <div className='h-[83vh]'>
                <div className=''>
                  <SearchUser />
                </div>

                <div className='h-full space-y-4 mt-5 overflow-y-scroll hideScrollbar'>

                  {
                    message.chats.map((item, index) => {
                      return (
                        <div
                          key={index}
                          onClick={() => {
                            setCurrentChat(item)
                            setMessages(item.messages)
                          }}>
                          <UserChatCard chat={item} />
                        </div>
                      )
                    })
                  }


                </div>

              </div>

            </div>

          </div>
        </Grid>

        <Grid size={9} className='h-full'>

          {currentChat
            ? <div>

              <div className='flex justify-between items-center border p-5'>
                <div className='flex items-center space-x-3'>
                  <Avatar src='https://cdn.pixabay.com/photo/2014/11/29/19/33/bald-eagle-550804_1280.jpg' />
                  <p>{auth.user.id === currentChat.users[0].id
                    ? currentChat.users[1].firstName + " " + currentChat.users[1].lastName
                    : currentChat.users[0].firstName + " " + currentChat.users[0].lastName
                  }
                  </p>
                </div>

                <div className='flex space-x-3'>
                  <IconButton>
                    <AddCallIcon />
                  </IconButton>
                  <IconButton>
                    <VideoCallIcon />
                  </IconButton>
                </div>

              </div>

              <div ref={chatContainerRef} className='hideScrollbar overflow-y-scroll h-[78vh] px-2 space-y-5 py-5'>
                {messages.map((item, index) => <ChatMessage key={index} item={item} />)}
              </div>
              <div className='sticky bottom-0 border'>

                {selectedImage && <img className='w-[5rem] h-[5rem] object-cover px-2' src={selectedImage} />}

                <div className='py-5 flex items-center justify-center space-x-5'>
                  <input
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.target.value) {
                        handleCreateMessage(e.target.value)
                        setSelectedImage(null)
                        e.target.value = ""
                      }
                    }}
                    className='bg-transparent border border-[#3b4054] rounded-full w-[90%] py-3 px-5'
                    placeholder='Type message...' type='text'

                  />

                  <div>
                    <input type='file' accept='image/*' onChange={handleSelectImage}
                      className='hidden' id='image-input' />
                    <label htmlFor='image-input'>
                      <IconButton color="primary" component="span" className="cursor-pointer">
                        <AddPhotoAlternateIcon />
                      </IconButton>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            : <div className='h-full space-y-5 flex flex-col justify-center items-center'>
              <ChatBubbleOutlineIcon sx={{ fontSize: "15rem" }} />
              <p className='text-xl font-semibold'>
                No Chat Selected
              </p>
            </div>

          }

        </Grid>
      </Grid>

      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}

export default Message