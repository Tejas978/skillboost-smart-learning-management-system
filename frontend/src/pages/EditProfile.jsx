import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { serverUrl } from '../App'
import { setUserData } from '../redux/userSlice'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'
import { HiArrowLeft } from "react-icons/hi2"
import { FaCamera } from "react-icons/fa"

function EditProfile() {
  let {userData} = useSelector(state=>state.user)
  let [name, setName] = useState(userData.name || "")
  let [description, setDescription] = useState(userData.description || "")
  let [photoUrl, setPhotoUrl] = useState(null)
  let [previewUrl, setPreviewUrl] = useState(userData.photoUrl || null)
  let dispatch = useDispatch()
  let [loading, setLoading] = useState(false)
  let navigate = useNavigate()

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPhotoUrl(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const updateProfile = async () => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("description", description)
      if (photoUrl) {
        formData.append("photoUrl", photoUrl)
      }

      const result = await axios.post(serverUrl + "/api/user/updateprofile", formData, {withCredentials:true})
      console.log(result.data)
      dispatch(setUserData(result.data))
      toast.success("Profile updated successfully")
      setLoading(false)
      navigate("/")
    } catch (error) {
      console.log(error)
      toast.error("Profile update error")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-gray-100 px-4 py-16">
      <div className="w-full max-w-3xl relative">
        
        {/* Back Button */}
        <button
          onClick={() => navigate("/profile")}
          className="group absolute -left-14 top-0 w-11 h-11 rounded-xl bg-white border-2 border-gray-200 flex items-center justify-center hover:bg-gray-900 hover:border-gray-900 transition-all duration-200 shadow-md z-10"
        >
          <HiArrowLeft className="w-5 h-5 text-gray-700 group-hover:text-white transition-colors duration-200" />
        </button>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
          
          {/* Header */}
          <div className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-10 py-8">
            <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
            <h1 className="relative text-3xl font-bold text-white text-center tracking-tight">Edit Profile</h1>
            <p className="relative text-sm text-gray-300 text-center  mt-2">Update your personal information</p>
          </div>
          {/* Form Content */}
          <div className="px-8 py-8">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              
              {/* Profile Photo Section */}
              <div className="flex flex-col items-center">
                <div className="relative group">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Profile"
                      className="w-28 h-28 rounded-full object-cover border-4 border-gray-200 shadow-lg"
                    />
                  ) : (
                    <div className="w-28 h-28 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white text-4xl font-bold border-4 border-gray-200 shadow-lg">
                      {userData?.name.slice(0,1).toUpperCase()}
                    </div>
                  )}
                  
                  {/* Camera Icon Overlay */}
                  <label className="absolute bottom-0 right-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors duration-200 shadow-lg border-2 border-white">
                    <FaCamera className="w-4 h-4 text-white" />
                    <input
                      type="file"
                      name="photoUrl"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-3">Click the camera icon to change photo</p>
              </div>

              {/* Name Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-900 transition-colors duration-200 text-gray-900 font-medium"
                  placeholder="Enter your name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>

              {/* Email Field (Read-only) */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    readOnly
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-600 font-medium cursor-not-allowed"
                    value={userData.email}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs bg-gray-200 px-2 py-1 rounded text-gray-600 font-semibold">
                    Read-only
                  </span>
                </div>
              </div>

              {/* Description Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
                <textarea
                  name="description"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl resize-none focus:outline-none focus:border-gray-900 transition-colors duration-200 text-gray-900 font-medium"
                  rows={4}
                  placeholder="Tell us about yourself..."
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
                <p className="text-xs text-gray-500 mt-1">Brief description for your profile</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => navigate("/profile")}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={updateProfile}
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <ClipLoader size={20} color='white'/>
                      <span>Saving...</span>
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>

            </form>
          </div>

        </div>

      </div>
    </div>
  )
}

export default EditProfile