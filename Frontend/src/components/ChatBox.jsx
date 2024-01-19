import React from 'react';
import ChatInput from './ChatInput';
import Message from './Message';
import axios from "axios";
import { sendMsgRoute } from '../utilities/ApiRoutes';

export default function ChatBox({ currentChat, currentUser }) {
    const handleSendMsg = async (msg) => {
        try {
            const data = await axios.post(sendMsgRoute, {
                from: currentUser._id,
                to: currentChat._id,
                message: msg
            });
            console.log(data);
        } catch (error) {
            console.log("Error aa gya heheheee");
            console.error("AxiosError:", error);
        }
    }

    return (
        <>
            {
                currentChat &&
                <div className='w-[80%]'>
                    <Message />
                    <ChatInput handleSendMsg={handleSendMsg} />
                </div>
            }
        </>
    )
}
