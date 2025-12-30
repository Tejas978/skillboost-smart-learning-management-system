import React, { useState } from 'react'
import logo from '../assets/logo11.jpg'
import google from '../assets/google.jpg'
import axios from 'axios'
import { serverUrl } from '../App'
import { MdOutlineRemoveRedEye } from "react-icons/md";

import { MdRemoveRedEye } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../utils/Firebase'
import { ClipLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'
function SignUp() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("student")
    const navigate = useNavigate()
    let [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    let dispatch = useDispatch()

    const handleSignUp = async () => {
        setLoading(true)
        try {
            const result = await axios.post(serverUrl + "/api/auth/signup", { name, email, password, role }, { withCredentials: true })
            dispatch(setUserData(result.data))

            navigate("/")
            toast.success("SignUp Successfully")
            setLoading(false)
        }
        catch (error) {
            console.log(error)
            setLoading(false)
            toast.error(error.response.data.message)
        }

    }
    const googleSignUp = async () => {
        try {
            const response = await signInWithPopup(auth, provider)
            console.log(response)
            let user = response.user
            let name = user.displayName;
            let email = user.email


            const result = await axios.post(serverUrl + "/api/auth/googlesignup", { name, email, role }
                , { withCredentials: true }
            )
            dispatch(setUserData(result.data))
            navigate("/")
            toast.success("SignUp Successfully")
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }

    }
    return (
        <div className='bg-[#dddbdb] w-[100vw] h-[100vh] flex items-center justify-center flex-col gap-3'>
            <form className='w-[90%] md:w-200 h-150 bg-[white] shadow-xl rounded-2xl flex' onSubmit={(e) => e.preventDefault()}>
                <div className='md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-3 '>
                    <div><h1 className='font-semibold text-[black] text-2xl'>Let's get Started</h1>
                        <h2 className='text-[#999797] text-[18px]'>Create your account</h2>
                    </div>
                    <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3'>
                        <label htmlFor="name" className='font-semibold'>
                            Name
                        </label>
                        <input id='name' type="text" className='border-1 w-[100%] h-[35px] rounded-md border-[#e7e6e6] text-[15px] px-[20px]' placeholder='Your name' onChange={(e) => setName(e.target.value)} value={name} />
                    </div>
                    <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3'>
                        <label htmlFor="email" className='font-semibold'>
                            Email
                        </label>
                        <input id='email' type="text" className='border-1 w-[100%] h-[35px] rounded-md border-[#e7e6e6] text-[15px] px-[20px]' placeholder='Your email' onChange={(e) => setEmail(e.target.value)} value={email} />
                    </div>
                    <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3 relative'>
                        <label htmlFor="password" className='font-semibold'>
                            Password
                        </label>
                        <input id='password' type={show ? "text" : "password"} className='border-1 w-[100%] h-[35px] rounded-md border-[#e7e6e6] text-[15px] px-[20px]' placeholder='***********' onChange={(e) => setPassword(e.target.value)} value={password} />
                        {!show && <MdOutlineRemoveRedEye className='absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]' onClick={() => setShow(prev => !prev)} />}
                        {show && <MdRemoveRedEye className='absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]' onClick={() => setShow(prev => !prev)} />}
                    </div>
                    <div className='flex md:w-[50%] w-[70%] items-center justify-between'>
                        <span className={`px-[10px] py-[5px] border-[1px] border-[#e7e6e6] rounded-2xl  cursor-pointer ${role === 'student' ? "border-black" : "border-[#646464]"}`} onClick={() => setRole("student")}>Student</span>
                        <span className={`px-[10px] py-[5px] border-[1px] border-[#e7e6e6] rounded-2xl  cursor-pointer ${role === 'educator' ? "border-black" : "border-[#646464]"}`} onClick={() => setRole("educator")}>Educator</span>
                    </div>
                    <button className='w-[80%] h-[40px] bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px]' disabled={loading} onClick={handleSignUp}>{loading ? <ClipLoader size={30} color='white' /> : "Sign Up"}</button>


                     <div className='w-[80%] flex items-center gap-2 my-1'>
                        <div className='flex-1 h-[0.5px] bg-[#c4c4c4]'></div>
                        <div className='text-[13px] text-[#6f6f6f]'>Or continue with</div>
                        <div className='flex-1 h-[0.5px] bg-[#c4c4c4]'></div>
                    </div>

                    <div 
                        className='w-[80%] h-[40px] border border-[black] rounded-lg flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors' 
                        onClick={googleSignUp}
                    >
                        {/* Google Icon SVG */}
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        <span className='text-[16px] text-gray-600 font-medium'>Google</span> 
                    </div>

                    <div className='text-[#6f6f6f] text-sm'>
                        Already have an account? <span className='underline underline-offset-1 text-[black] font-medium cursor-pointer' onClick={() => navigate("/login")}>Login</span>
                    </div>
                </div>
                {/* Right Side - Branding Section */}
                <div className='hidden md:flex w-1/2 bg-black relative flex-col items-center justify-center p-12 overflow-hidden rounded-r-2xl'>

                    {/* Abstract decorative circles for depth */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-gray-900 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-72 h-72 bg-gray-800 rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2"></div>

                    <div className='relative z-10 flex flex-col items-center text-center'>
                        <div className='bg-white p-4 rounded-2xl shadow-2xl mb-8 transform rotate-3 hover:rotate-6 transition-transform duration-500'>
                            <img src={logo} className='w-40 h-auto object-contain' alt="Skill Boost Logo" />
                        </div>

                        <h2 className='text-4xl font-bold text-white mb-4 tracking-wide'>
                            SKILL BOOST
                        </h2>

                        <p className='text-gray-400 text-lg max-w-sm'>
                            Empower your future with world-class education and expert guidance.
                        </p>
                    </div>
                </div>


            </form>

        </div>
    )
}

export default SignUp
