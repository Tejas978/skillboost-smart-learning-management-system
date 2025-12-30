import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { HiArrowLeft } from "react-icons/hi2";
import { FaPlayCircle, FaBook, FaClock, FaCheckCircle } from "react-icons/fa";
import { MdBookmarkBorder, MdBookmark } from "react-icons/md";

function EnrolledCourse() {
  const navigate = useNavigate()
  const { userData } = useSelector((state) => state.user);
  const [bookmarkedCourses, setBookmarkedCourses] = useState([]);
  const [filterCategory, setFilterCategory] = useState('All');

  const toggleBookmark = (courseId) => {
    if (bookmarkedCourses.includes(courseId)) {
      setBookmarkedCourses(bookmarkedCourses.filter(id => id !== courseId));
    } else {
      setBookmarkedCourses([...bookmarkedCourses, courseId]);
    }
  };

  // Get unique categories
  const categories = ['All', ...new Set(userData?.enrolledCourses?.map(course => course.category) || [])];

  // Filter courses
  const filteredCourses = filterCategory === 'All' 
    ? userData?.enrolledCourses 
    : userData?.enrolledCourses?.filter(course => course.category === filterCategory);

  const getLevelColor = (level) => {
    switch(level?.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-700 border-green-200';
      case 'intermediate': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'advanced': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate("/")}
              className="w-11 h-11 rounded-xl bg-gray-100 hover:bg-slate-900 border border-gray-200 hover:border-slate-900 flex items-center justify-center transition-all duration-200 group"
            >
              <HiArrowLeft className="w-5 h-5 text-gray-700 group-hover:text-white transition-colors duration-200" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Learning</h1>
              <p className="text-sm text-gray-600 mt-1">
                {userData?.enrolledCourses?.length || 0} course{userData?.enrolledCourses?.length !== 1 ? 's' : ''} enrolled
              </p>
            </div>
          </div>

          {/* Filter Tabs */}
          {userData?.enrolledCourses?.length > 0 && (
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilterCategory(category)}
                  className={`px-5 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap transition-all duration-200 ${
                    filterCategory === category
                      ? 'bg-slate-900 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {!userData?.enrolledCourses || userData.enrolledCourses.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <FaBook className="w-16 h-16 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Courses Yet</h2>
            <p className="text-gray-600 mb-6 text-center max-w-md">
              You haven't enrolled in any courses yet. Start learning today by exploring our course catalog!
            </p>
            <button
              onClick={() => navigate("/allcourses")}
              className="px-6 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-all duration-200 shadow-lg"
            >
              Explore Courses
            </button>
          </div>
        ) : (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <FaBook className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Total Courses</p>
                    <p className="text-2xl font-bold text-gray-900">{userData.enrolledCourses.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <FaCheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Completed</p>
                    <p className="text-2xl font-bold text-gray-900">0</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <FaClock className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">In Progress</p>
                    <p className="text-2xl font-bold text-gray-900">{userData.enrolledCourses.length}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses?.map((course) => (
                <div
                  key={course._id}
                  className="group bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden bg-gray-200">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Bookmark Button */}
                    <button
                      onClick={() => toggleBookmark(course._id)}
                      className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-200 shadow-lg"
                    >
                      {bookmarkedCourses.includes(course._id) ? (
                        <MdBookmark className="w-5 h-5 text-blue-600" />
                      ) : (
                        <MdBookmarkBorder className="w-5 h-5 text-gray-700" />
                      )}
                    </button>

                    {/* Progress Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <div className="w-full bg-gray-200/30 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-green-500 h-full rounded-full" style={{ width: '0%' }}></div>
                      </div>
                      <p className="text-white text-xs font-semibold mt-2">0% Complete</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Category & Level */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold uppercase">
                        {course.category}
                      </span>
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase border ${getLevelColor(course.level)}`}>
                        {course.level}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
                      {course.title}
                    </h2>

                    {/* Lectures Count */}
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                      <FaPlayCircle className="w-4 h-4" />
                      <span>{course.lectures?.length || 0} lectures</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/viewlecture/${course._id}`)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-all duration-200 shadow-md"
                      >
                        <FaPlayCircle className="w-4 h-4" />
                        Continue
                      </button>
                      <button
                        onClick={() => navigate(`/viewcourse/${course._id}`)}
                        className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {filteredCourses?.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No courses found in this category.</p>
              </div>
            )}
          </>
        )}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}

export default EnrolledCourse