import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { HiArrowLeft } from "react-icons/hi2";

function Profile() {
  const { userData } = useSelector(state => state.user)
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">

      <div className="w-full max-w-xl relative">

        <button
          onClick={() => navigate("/")}
          className="
    absolute 
    left-4 top-4 
    md:-left-14 md:top-0
    w-10 h-10 
    rounded-lg 
    bg-white 
    border border-gray-300 
    flex items-center justify-center 
    hover:bg-gray-900 hover:border-gray-900 
    transition-all duration-200 
    shadow-sm 
    group 
    z-10
  "
        >
          <HiArrowLeft className="w-5 h-5 text-gray-700 group-hover:text-white transition-colors duration-200" />
        </button>


        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

          {/* Dark Header */}
          <div className="h-28 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800"></div>

          {/* Profile Picture Overlapping Header */}
          <div className="relative -mt-14 flex justify-center">
            {userData?.photoUrl ? (
              <img
                src={userData.photoUrl}
                alt="profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-black text-white flex items-center justify-center text-4xl font-bold border-4 border-white shadow-lg">
                {userData?.name?.slice(0, 1).toUpperCase()}
              </div>
            )}
          </div>

          {/* Profile Content */}
          <div className="px-8 pt-4 pb-8 text-center">

            {/* Name */}
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              {userData?.name}
            </h1>

            {/* Role */}
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-8">
              {userData?.role}
            </p>

            {/* Information Cards */}
            <div className="space-y-4 text-left">

              {/* Email */}
              <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Email</p>
                  <p className="text-sm text-gray-900 font-medium break-all">{userData?.email}</p>
                </div>
              </div>

              {/* Bio */}
              <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-xl">
                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Bio</p>
                  <p className="text-sm text-gray-900 font-medium break-words">
                    {userData?.description ? (
                      <span>{userData.description}</span>
                    ) : (
                      <span className="text-gray-400 italic">No bio added yet</span>
                    )}
                  </p>
                </div>
              </div>

              {/* Enrolled Courses */}
              <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Enrolled Courses</p>
                  <p className="text-sm text-gray-900 font-bold">{userData?.enrolledCourses?.length || 0}</p>
                </div>
              </div>

            </div>

            {/* Edit Profile Button */}
            <button
              onClick={() => navigate("/editprofile")}
              className="w-full mt-8 px-6 py-3 bg-slate-900 text-white rounded-xl font-semibold text-sm hover:bg-slate-800 transition-colors duration-200 shadow-md"
            >
              Edit Profile
            </button>

          </div>

        </div>

      </div>
    </div>
  )
}

export default Profile