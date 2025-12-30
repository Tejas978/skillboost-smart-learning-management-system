import React, { useEffect } from 'react'
import { FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { serverUrl } from '../../App';
import { toast } from 'react-toastify';
import { setCreatorCourseData } from '../../redux/courseSlice';
import img1 from "../../assets/empty.jpg"
import { FaArrowLeftLong } from "react-icons/fa6";

function Courses() {
  let navigate = useNavigate()
  let dispatch = useDispatch()

  const { creatorCourseData } = useSelector(state => state.course)

  useEffect(() => {
    const getCreatorData = async () => {
      try {
        const result = await axios.get(serverUrl + "/api/course/getcreatorcourses", { withCredentials: true })
        await dispatch(setCreatorCourseData(result.data))
        console.log(result.data)
      } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
      }
    }
    getCreatorData()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className='flex items-center gap-3'>
            <button 
              onClick={() => navigate("/dashboard")}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FaArrowLeftLong className='w-5 h-5 text-gray-700' />
            </button>
            <h1 className="text-xl font-semibold text-gray-800">My Courses</h1>
          </div>
          <button 
            className="px-6 py-2.5 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-all hover:scale-105 shadow-lg" 
            onClick={() => navigate("/createcourses")}
          >
            Create Course
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Desktop Table View */}
        <div className="hidden md:block bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Course</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Price</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {creatorCourseData?.map((course, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={course?.thumbnail || img1}
                          alt={course?.title}
                          className="w-20 h-14 object-cover rounded-lg shadow-sm"
                        />
                        <span className="font-medium text-gray-900">{course?.title}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-700 font-medium">
                      {course?.price ? `₹${course.price}` : '₹ NA'}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                        course?.isPublished 
                          ? "text-green-700 bg-green-100" 
                          : "text-orange-700 bg-orange-100"
                      }`}>
                        {course?.isPublished ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <button 
                        onClick={() => navigate(`/addcourses/${course?._id}`)}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      >
                        <FaEdit className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-sm text-gray-500 py-6 border-t border-gray-200">
            A list of your recent courses
          </p>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {creatorCourseData?.map((course, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md border border-gray-200 p-4 hover:shadow-lg transition-shadow">
              <div className="flex gap-4 items-start">
                <img
                  src={course?.thumbnail || img1}
                  alt={course?.title}
                  className="w-20 h-20 rounded-lg object-cover shadow-sm flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold text-gray-900 mb-1 line-clamp-2">{course?.title}</h2>
                  <p className="text-gray-700 font-medium text-sm mb-2">
                    {course?.price ? `₹${course.price}` : '₹ NA'}
                  </p>
                  <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                    course?.isPublished 
                      ? "text-green-700 bg-green-100" 
                      : "text-orange-700 bg-orange-100"
                  }`}>
                    {course?.isPublished ? "Published" : "Draft"}
                  </span>
                </div>
                <button 
                  onClick={() => navigate(`/addcourses/${course?._id}`)}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all flex-shrink-0"
                >
                  <FaEdit className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
          <p className="text-center text-sm text-gray-500 pt-4">
            A list of your recent courses
          </p>
        </div>
      </div>
    </div>
  );
}

export default Courses