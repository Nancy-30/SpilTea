import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { allUsersRoute } from '../utilities/ApiRoutes';
import Contacts from '../components/Contacts';

export default function Chat() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  // useEffect(async () => {
  //   if (!localStorage.getItem("spilTeaUser")) {
  //     navigate("/");
  //   } else {
  //     setCurrentUser(await JSON.parse(localStorage.getItem("spilTeaUser")))
  //   }
  // })

  // useEffect(async () => {
  //   if (currentUser) {
  //     const data = await axios.get(`${allUsersRoute}/${currentUser._id}`)
  //     setContacts(data.data);
  //   }
  // }, [])


  return (
    <div className='flex justify-center'>
      <div className='w-[90%] bg-black h-[600px] mt-8 rounded-md'>
        <Contacts />
      </div>
    </div>
  )
}

