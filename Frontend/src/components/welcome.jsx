import React from 'react'
import Hello from "../assets/hello.gif"



export default function welcome({ currentUser }) {
    return (
        <div className='w-[80%] text-white flex flex-col items-center justify-center h-[39.2rem]'>
            <img src={Hello} alt="hello" className='h-[15rem]' />
            <p>Select a chat to start the conversation.</p>
        </div>
    )
}
