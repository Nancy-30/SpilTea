import React, { useState } from 'react'
import Picker from 'emoji-picker-react';
import { IoMdSend } from "react-icons/io";
import { MdEmojiEmotions } from "react-icons/md";

export default function ChatInput({ handleSendMsg }) {
    const [showEmojies, setShowEmojies] = useState(false);
    const [msg, setMesg] = useState("");

    const hancleEmojiShow = () => {
        setShowEmojies(!showEmojies);
    }

    const handleEmojiClick = (event, emojiObject) => {
        console.log("emoji nhi aa rha", emojiObject);
        let message = msg;
        message += emojiObject.emoji;
        setMesg(message);
    }

    const sendChat = (event) => {
        event.preventDefault();
        if (msg.length > 0) {
            handleSendMsg(msg);
            setMesg('')
        }
    }

    return (
        <div className='relative'>
            <div className='text-white fixed bottom-0 flex w-full bg-gray-600 items-center text-xl gap-2 p-3 rounded-sm'>
                <MdEmojiEmotions className='text-2xl cursor-pointer' onClick={hancleEmojiShow} />
                <form className='w-[80%] flex gap-3' onSubmit={(e) => sendChat(e)}>
                    <input type="text" placeholder='Enter your message' className='w-[93%] p-1 bg-gray-600 outline-none' value={msg} onChange={(e) => setMesg(e.target.value)} />
                    <button type='submit'><IoMdSend className='text-2xl cursor-pointer' /></button>
                </form>
            </div>
            {
                showEmojies && <Picker className='fixed top-[6rem] ' onEmojiClick={(emoji, event) => handleEmojiClick(event, emoji)} />
            }
        </div>
    )
}
