import React, { useState } from 'react'
import logo from '../assets/logo11.jpg'
import axios from 'axios'
import { serverUrl } from '../App'
import { MdOutlineRemoveRedEye, MdRemoveRedEye } from "react-icons/md"
import { useNavigate } from 'react-router-dom'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../utils/Firebase'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogin = async () => {
    setLoading(true)
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/login",
        { email, password },
        { withCredentials: true }
      )

      dispatch(setUserData(result.data))
      toast.success("Login Successful")
      navigate("/")
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }
    
  const googleLogin = async () => {
    setLoading(true)
    try {
      const response = await signInWithPopup(auth, provider)
      const user = response.user

      const result = await axios.post(
        serverUrl + "/api/auth/googlesignup",
        {
          name: user.displayName || "Google User",
          email: user.email,
          role: ""
        },
        { withCredentials: true }
      )

      dispatch(setUserData(result.data))
      toast.success("Login Successful")
      navigate("/")
    } catch (error) {
      toast.error(error.response?.data?.message || "Google login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#dddbdb] w-screen h-screen flex items-center justify-center">
      <form
        className="w-[90%] md:w-200 h-150 bg-white shadow-xl rounded-2xl flex"
        onSubmit={(e) => e.preventDefault()}
      >

        {/* LEFT SECTION */}
        <div className="md:w-1/2 w-full flex flex-col items-center justify-center gap-4">

          <div className="text-center">
            <h1 className="text-2xl font-semibold text-black">Welcome back</h1>
            <p className="text-gray-500">Login to your account</p>
          </div>

          {/* EMAIL */}
          <div className="w-[80%] flex flex-col gap-1">
            <label className="font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="h-[35px] px-4 border rounded-md focus:ring-1 focus:ring-black outline-none"
            />
          </div>

          {/* PASSWORD */}
          <div className="w-[80%] flex flex-col gap-1 relative">
            <label className="font-semibold">Password</label>
            <input
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="***********"
              className="h-[35px] px-4 border rounded-md focus:ring-1 focus:ring-black outline-none"
            />
            <span
              className="absolute right-3 top-[36px] cursor-pointer text-gray-600 hover:text-black"
              onClick={() => setShow(!show)}
            >
              {show ? <MdRemoveRedEye /> : <MdOutlineRemoveRedEye />}
            </span>
          </div>

          {/* LOGIN BUTTON */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-[80%] h-[40px] bg-black text-white rounded-md
            hover:bg-gray-900 transition disabled:opacity-70 flex items-center justify-center"
          >
            {loading ? <ClipLoader size={22} color="white" /> : "Login"}
          </button>

          <span
            className="text-sm text-gray-500 cursor-pointer hover:underline"
            onClick={() => navigate("/forgotpassword")}
          >
            Forgot your password?
          </span>

          {/* DIVIDER */}
          <div className="w-[80%] flex items-center gap-2 my-1">
            <div className="flex-1 h-[0.5px] bg-gray-300"></div>
            <span className="text-sm text-gray-500">Or continue with</span>
            <div className="flex-1 h-[0.5px] bg-gray-300"></div>
          </div>

          {/* GOOGLE BUTTON */}
          <div
            onClick={googleLogin}
            className="w-[80%] h-[40px] border border-black rounded-lg
            flex items-center justify-center gap-2 cursor-pointer
            hover:bg-gray-50 transition"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="font-medium text-gray-600">Google</span>
          </div>

          <p className="text-sm text-gray-500">
            Don’t have an account?
            <span
              className="ml-1 text-black font-medium underline cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </span>
          </p>
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

export default Login
