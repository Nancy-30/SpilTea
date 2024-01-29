import React, { useEffect, useState } from 'react';
import ChatInput from './ChatInput';
import Message from './Message';
import axios from "axios";
import { sendMsgRoute, getAllMsgsRoute } from '../utilities/ApiRoutes';

export default function ChatBox({ currentChat, currentUser }) {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        let isMounted = true; // Flag to track component mount status

        const fetchData = async () => {
            try {
                const response = await axios.get(getAllMsgsRoute, {
                    from: currentUser._id,
                    to: currentChat._id
                });

                if (isMounted) {
                    setMessages(response.data);
                }
            } catch (error) {
                console.log("Error occurred:", error);
            }
        };

        fetchData(); // Invoke fetchData function

        return () => {
            // Cleanup function
            isMounted = false;
        };
    }, [currentChat]);

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
                    <div className='chat-msg text-white'>
                        {
                            messages.map((message) => {
                                return (
                                    <div>
                                        <div className={`${message.fromSelf ? "text-white z-[101] bg-red-500" : "text-white z-[101] bg-blue-500"}`}>
                                            <div>
                                                <p>{message.message}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <ChatInput handleSendMsg={handleSendMsg} />
                </div>
            }
        </>
    )
}
