import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import background from '../assets/background.png';
import { SiGmail } from "react-icons/si";
import { FaUser, FaLock } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import axios from "axios";
import { registerRoute } from '../utilities/ApiRoutes';
import { useNavigate } from 'react-router-dom';


export default function Register() {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('spil-tea-user')) {
            navigate('/chat');
        }
    }, [])


    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            const { password, username, email } = values;
            const data = await axios.post(registerRoute, { username, email, password });
            console.log(data.data.status);
            if (data.status === false) {
                toast.error(data.msg, toastOptions);
            }

            if (data.data.status === true) {
                console.log(data.data);
                localStorage.setItem('spil-tea-user', JSON.stringify(data.data.user));
                navigate('/chat');
            }

        }
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    const toastOptions = {
        position: "bottom-left",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }
    const handleValidation = () => {
        const { password, confirmPassword, username, email } = values;
        if (password !== confirmPassword) {
            toast.error("Password and confirm password must be same!!", toastOptions);
            return false;
        }
        else if (username.length < 3) {
            toast.error("username must be greater than 3 character long", toastOptions);
            return false;
        }
        else if (password.length < 8) {
            toast.error("password must be greater than or equal to 8 character long", toastOptions);
            return false;
        }
        else if (email.length === 0) {
            toast.error("Email is required", toastOptions);
            return false;
        }
        return true;
    }

    return (
        <div className='select-none'>
            <div className='h-[695px] absolute w-full overflow-hidden flex'>
                <img src={background} alt="bg" className='rotate-90 w-full object-cover fixed' />
                <div className='z-40 text-white w-[400px] lg:w-[500px] h-[200px] lg:h-[250px] md:translate-x-[100px]  lg:translate-x-[250px] translate-y-[250px] flex flex-col justify-center p-6 gap-5  bg-red-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-20 border '>
                    <h1 className='text-4xl lg:text-5xl font-serif'>SpilTea</h1>
                    <p className='text-sm lg:text-md'>Sip, Share, Spill: Let Spil Tea, your conversational companion, steep your interactions with a blend of warmth, wit, and wisdom.</p>
                </div>
            </div>

            <div className='w-full flex justify-end items-center h-[695px] text-white'>
                <div className='w-[40%] lg:w-[30%] bg-red-300 h-[690px] flex flex-col items-center pt-4 shadow-lg shadow-gray-900 z-50 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-20 rounded-md'>
                    <h1 className='p-4 text-3xl lg:text-4xl font-bold mt-7 lg:mt-11'>Sign In</h1>

                    {/* form */}
                    <form className=' flex flex-col gap-3 w-[80%] items-center mt-11' onSubmit={(e) => handleSubmit(e)}>
                        <label className='w-full font-semibold'>
                            <p className='lg:text-lg'>Username</p>
                            <div className='flex items-center gap-2 bg-white w-[90%] pl-2'>
                                <FaUser className='text-gray-400' />
                                <input name='username' placeholder='Username' type='text' className='w-full p-2 focus:outline-none text-gray-500 font-semibold' onChange={(e) => handleChange(e)} />
                            </div>
                        </label>

                        <label className='w-full font-semibold'>
                            <p className='lg:text-lg'>Email</p>
                            <div className='flex items-center gap-2 bg-white w-[90%] pl-2'>
                                <SiGmail className='text-gray-400' />
                                <input name='email' placeholder='Enter your email' type='email' className='w-full p-2 focus:outline-none text-gray-500 font-semibold' onChange={(e) => handleChange(e)} />
                            </div>
                        </label>

                        <label className='w-full font-semibold '>
                            <p className='lg:text-lg'>Password</p>
                            <div className='flex items-center gap-2 bg-white w-[90%] pl-2'>
                                <FaLock className='text-gray-400' />
                                <input name='password' placeholder='Set a password' type='password' className='w-full p-2 focus:outline-none text-gray-500 font-semibold' onChange={(e) => handleChange(e)} />
                            </div>
                        </label>

                        <label className='w-full font-semibold '>
                            <p className='lg:text-lg'>Confirm Password</p>
                            <div className='flex items-center gap-2 bg-white w-[90%] pl-2'>
                                <FaLock className='text-gray-400' />
                                <input name='confirmPassword' placeholder='Confirm password' type='password' className='w-full p-2 focus:outline-none text-gray-500 font-semibold' onChange={(e) => handleChange(e)} />
                            </div>
                        </label>

                        <button type="submit" className='mt-3 rounded-md bg-gray-300 hover:before:bg-redborder-red-500 relative p-3 w-40 overflow-hidden px-3 text-black shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-gradient-to-r from-rose-400 via-pink-400 to-blue-400 before:transition-all before:duration-500 hover:text-white hover:before:left-0 hover:before:w-full text-center hover:font-semibold cursor-pointer'><span className='relative z-10 '>Register</span></button>
                    </form>
                    <p className='mt-5'>Already a user?</p>
                    <Link to="/" className='hover:bg-gradient-to-r from-rose-500 to-blue-900 bg-clip-text hover:text-transparent hover:font-semibold'>Login</Link>
                </div>
            </div>

            <ToastContainer />
        </div>
    )
}
