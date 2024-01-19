import React, { useState, useEffect } from 'react'
import Logo from "../assets/logo.png"
import Logout from './Logout';

export default function Contacts({ Contacts, currentUser, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImg, setCurrentUserImg] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImg(currentUser.avatarImage);
      setCurrentUserName(currentUser.username)
    }
  }, [currentUser])

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  }

  return (
    <div className='flex h-[38rem] w-[20%] border-r-[0.5px]'>
      {
        currentUserName && (
          <section className='w-full h-[34.3rem] overflow-y-scroll  scrollbar-thumb-gray-400 scrollbar-thin scrollbar-thumb-rounded-full '>
            <div className='cursor-pointer '>
              {
                Contacts.map((contact, index) => {
                  return (
                    <div key={index} className={`${index === currentSelected ? "bg-gray-300 text-black" : "text-white bg-gray-600"}  flex p-2 m-2  items-center gap-3 text-xl rounded-lg hover:shadow-sm hover:shadow-gray-400 z-0`} onClick={() => changeCurrentChat(index, contact)}>
                      <img src={Logo} alt="profile pic" className='rounded-full h-[50px] w-[50px] object-cover' />
                      <h3>{contact.username}</h3>
                    </div>
                  );
                })}
            </div>
          </section>
        )}

      <div className='text-black w-[20%] flex p-2 items-center gap-3 text-xl fixed bottom-0 z-[100] bg-gray-400'>
        <div className='flex w-full items-center gap-3'>
          <img src={Logo} alt="profile pic" className='rounded-full h-[50px] w-[50px] object-cover' />
          <h2>{currentUser?.username}</h2>
        </div>
        <Logout />
      </div>
    </div>
  )
}
