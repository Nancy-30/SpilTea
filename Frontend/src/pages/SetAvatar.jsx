import { React, useState } from 'react';
import background from '../assets/background.png';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import axios from "axios";
import { setAvatarRoute } from '../utilities/ApiRoutes';
import { useNavigate } from 'react-router-dom';
import images from "../utilities/Images";


export default function SetAvatar() {
    const navigate = useNavigate();
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);

    const toastOptions = {
        position: "bottom-left",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }

    const setProfilePic = async () => {
        if (selectedAvatar === undefined) {
            toast.error("Select an avatar", toastOptions);
        } else {
            console.log("hehe erroorrrrrrr")
            const user = await JSON.parse(localStorage.getItem("SpilTeaUser"));
            console.log(selectedAvatar);
            const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
                image: selectedAvatar,
            });

            if (data.isSet) {
                user.isAvatarSet = true;
                user.avatarImage = data.image;
                localStorage.setItem("spilTeaUser", JSON.stringify(user));
                navigate('/chat');
            } else {
                toast.error("Error in setting avatar", toastOptions);
            }
        }

    };


    return (
        <div className="select-none bg-[url('/assets/background.png ')] h-[695px] flex flex-col items-center">
            <img src={background} alt="bg" className='rotate-90 w-full object-cover fixed' />
            <div className='w-full  overflow-hidden flex items-center flex-col lg:pt-6 bg-slate-700'>
                <div className='z-40 absolute top-[10%] text-white w-[400px] lg:w-[800px] h-[80px] flex justify-center p-6 gap-5  bg-red-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-20 border items-center'>
                    <h1 className='text-md md:text-xl lg:text-3xl font-serif'>Pick an avatar for your profile picture.</h1>
                </div>
            </div>

            <div className='z-50 justify-center gap-8 flex flex-wrap w-[85%] absolute top-[35%]'>
                {images.map((imageObj) => (
                    <img
                        key={imageObj.index}
                        src={imageObj.image}
                        alt={` ${imageObj.index}`}
                        className='w-[150px] h-[150px] rounded-full cursor-pointer hover:border-[5px] border-black border-solid' onClick={() => setSelectedAvatar(imageObj.image)}
                    />
                ))}
            </div>

            <button type="submit" className='mt-3 rounded-md bg-gray-300 hover:before:bg-redborder-red-500 p-3 w-40 overflow-hidden px-3 text-black shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-gradient-to-r from-blue-500 via-pink-400 to-red-400 before:transition-all before:duration-500 hover:text-white hover:before:left-0 hover:before:w-full text-center hover:font-semibold cursor-pointer bottom-4 fixed' onClick={setProfilePic}><span className='relative z-10 '>Set avatar</span></button>
            <ToastContainer />
        </div>
    )
}
