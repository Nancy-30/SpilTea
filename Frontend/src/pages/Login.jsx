import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import background from '../assets/background.png';
import { FaLock, FaUser } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import axios from "axios";
import { loginRoute } from '../utilities/ApiRoutes';
import { useNavigate } from 'react-router-dom';



export default function Login() {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('SpilTeaUser')) {
            navigate('/chat');
        }
    }, [])

    const [values, setValues] = useState({
        username: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            const { username, password } = values;
            const data = await axios.post(loginRoute, { username, password });
            console.log(data);
            console.log("chal rha h ")
            if (data.data.status === false) {
                toast.error(data.data.msg, toastOptions);
                console.log("erorrrrr");
            }

            if (data.data.status === true) {
                console.log("abeeee");
                console.log(data.data.tempUser);
                localStorage.setItem('SpilTeaUser', JSON.stringify(data.data.tempUser));
                navigate('/chat');
            }

        }
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        console.log(values);
    }

    const toastOptions = {
        position: "bottom-left",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }
    const handleValidation = () => {
        const { username, password } = values;
        if (password.length === "") {
            console.log("yahaaaaaa");
            toast.error("Password required", toastOptions);
            return false;
        }
        else if (username.length === "") {
            toast.error("username required", toastOptions);
            return false;
        }
        return true;
    }

    return (
        <div className='select-none'>
            <div className='h-[695px] absolute w-full overflow-hidden flex'>
                <img src={background} alt="bg" className='rotate-90 w-full object-cover fixed' />
                <div className='z-40 text-white w-[500px] h-[250px] translate-x-[250px] translate-y-[250px] flex flex-col justify-center p-6 gap-5  bg-red-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-20 border '>
                    <h1 className='text-5xl font-serif'>SpilTea</h1>
                    <p className='text-md'>Sip, Share, Spill: Let Spil Tea, your conversational companion, steep your interactions with a blend of warmth, wit, and wisdom.</p>
                </div>
            </div>

            <div className='w-full flex justify-end items-center h-[695px] text-white'>
                <div className='w-[30%] bg-red-300 h-[690px] flex flex-col items-center pt-4 shadow-lg shadow-gray-900 z-50 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-20 rounded-md'>
                    <h1 className='p-4 text-4xl font-bold mt-11'>Login</h1>

                    {/* form */}
                    <form className=' flex flex-col gap-3 w-[80%] items-center mt-16' onSubmit={(e) => handleSubmit(e)}>

                        <label className='w-full font-semibold'>
                            <p className='lg:text-lg'>Username</p>
                            <div className='flex items-center gap-2 bg-white w-[90%] pl-2'>
                                <FaUser className='text-gray-400' />
                                <input name='username' placeholder='Username' type='text' className='w-full p-2 focus:outline-none text-gray-500 font-semibold' onChange={(e) => handleChange(e)} />
                            </div>
                        </label>

                        <label className='w-full font-semibold '>
                            <p className='text-lg'>Password</p>
                            <div className='flex items-center gap-2 bg-white w-[90%] pl-2'>
                                <FaLock className='text-gray-400' />
                                <input placeholder='Password' type='password' name='password' className='p-2 w-full focus:outline-none text-gray-500 font-semibold' onChange={(e) => handleChange(e)} />
                            </div>
                        </label>

                        <button type="submit" className='mt-3 rounded-md bg-gray-300 hover:before:bg-redborder-red-500 relative p-3 w-40 overflow-hidden px-3 text-black shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-gradient-to-r from-rose-400 via-pink-400 to-blue-400 before:transition-all before:duration-500 hover:text-white hover:before:left-0 hover:before:w-full text-center hover:font-semibold cursor-pointer'><span className='relative z-10 '>Login</span></button>
                    </form>
                    <p className='mt-5'>Don't have any accout?</p>
                    <Link to="/register" className='hover:bg-gradient-to-r from-rose-500 to-blue-900 bg-clip-text hover:text-transparent hover:font-semibold'>Sign up</Link>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}
