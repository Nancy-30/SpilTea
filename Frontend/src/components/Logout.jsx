import React from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import { IoIosLogOut } from "react-icons/io";

export default function Logout() {
    const navigate = useNavigate();
    const handleClick = async () => {
        localStorage.clear();
        navigate("/");
    }
    return (
        <div className='cursor-pointer'>
            <IoIosLogOut className='hover:text-2xl' onClick={handleClick} />
        </div>
    )
}
