import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUsersRoute } from '../utilities/ApiRoutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/welcome';
import Logo from "../assets/logo.png";
import ChatBox from '../components/ChatBox';
import Logout from '../components/Logout';

export default function Chat() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(localStorage.getItem("spil-tea-user"));

        if (!localStorage.getItem("spil-tea-user")) {
          navigate("/");
        } else {
          const user = await JSON.parse(localStorage.getItem("spil-tea-user"));
          setCurrentUser(user);
          setIsLoaded(true);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [navigate]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        if (currentUser) {
          const response = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(response.data);
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, [currentUser]);

  useEffect(() => {
    // Log the updated currentUser
    console.log("Updated currentUser:", currentUser);
  }, [currentUser]);


  const handleChatChange = (chat) => {
    setCurrentChat(chat);
    console.log(currentChat);
  }


  return (
    <div className='flex flex-col bg-black w-full h-[43.45rem]'>
      {/* navBar */}
      <div className='w-full flex border-b-[0.5px]' >
        <nav className='w-[20%] bg-black text-white flex items-center gap-3 p-2 border-r-[0.5px] '>
          <img src={Logo} alt="logo" className='rounded-full h-[50px] w-[50px] object-cover' />
          <h3 className='text-xl'>SpilTea</h3>
        </nav>

        {currentChat === undefined ? (<></>) : (<div className='text-white w-[80%] flex p-2 items-center gap-3 text-xl z-[100] bg-black'>
          <div className='flex w-full items-center gap-3'>
            <img src={Logo} alt="profile pic" className='rounded-full h-[50px] w-[50px] object-cover' />
            <h2>{currentChat?.username}</h2>
          </div>

        </div>)}

      </div>
      <div className='flex'>
        <div className=' rounded-md w-full flex'>
          <Contacts Contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
          {isLoaded &&
            currentChat === undefined ? (<Welcome currentUser={currentUser} />) : (<ChatBox currentChat={currentChat} currentUser={currentUser} />)
          }
        </div>
      </div>
    </div>
  );
}
