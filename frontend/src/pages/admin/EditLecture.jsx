import axios from 'axios'
import React, { useState } from 'react'
import { FaArrowLeft } from "react-icons/fa"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { serverUrl } from '../../App'
import { setLectureData } from '../../redux/lectureSlice'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'

function EditLecture() {
    const [loading, setLoading] = useState(false)
    const [loading1, setLoading1] = useState(false)
    const { courseId, lectureId } = useParams()
    const { lectureData } = useSelector(state => state.lecture)
    const dispatch = useDispatch()
    const selectedLecture = lectureData.find(lecture => lecture._id === lectureId)
    const [videoUrl, setVideoUrl] = useState(null)
    const [lectureTitle, setLectureTitle] = useState(selectedLecture.lectureTitle)
    const [isPreviewFree, setIsPreviewFree] = useState(false)
    const navigate = useNavigate()

    const formData = new FormData()
    formData.append("lectureTitle", lectureTitle)
    formData.append("videoUrl", videoUrl)
    formData.append("isPreviewFree", isPreviewFree)

    const editLecture = async () => {
        setLoading(true)
        try {
            const result = await axios.post(serverUrl + `/api/course/editlecture/${lectureId}`, formData, { withCredentials: true })
            console.log(result.data)
            dispatch(setLectureData([...lectureData, result.data]))
            toast.success("Lecture Updated")
            navigate("/courses")
            setLoading(false)
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
            setLoading(false)
        }
    }

    const removeLecture = async () => {
        setLoading1(true)
        try {
            const result = await axios.delete(serverUrl + `/api/course/removelecture/${lectureId}`, { withCredentials: true })
            console.log(result.data)
            toast.success("Lecture Removed")
            navigate(`/createlecture/${courseId}`)
            setLoading1(false)
        } catch (error) {
            console.log(error)
            toast.error("Lecture remove error")
            setLoading1(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
                <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-4">
                    <button
                        onClick={() => navigate(`/createlecture/${courseId}`)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <FaArrowLeft className="w-5 h-5 text-gray-700" />
                    </button>
                    <h1 className="text-xl font-semibold text-gray-800">Edit Lecture</h1>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-3xl mx-auto px-6 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                    {/* Delete Action Bar */}
                    <div className="bg-gray-50 border-b border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Lecture Actions</h3>
                        <button
                            className="px-5 py-2.5 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
                            disabled={loading1}
                            onClick={removeLecture}
                        >
                            {loading1 ? <ClipLoader size={20} color='white' /> : "Delete Lecture"}
                        </button>
                    </div>

                    {/* Form */}
                    <form className="p-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-6">Lecture Details</h3>
                        </div>

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Lecture Title
                            </label>
                            <input
                                type="text"
                                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                                placeholder="Enter lecture title"
                                onChange={(e) => setLectureTitle(e.target.value)}
                                value={lectureTitle}
                            />
                        </div>

                        {/* Video Upload */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Video File <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="file"
                                required
                                accept='video/*'
                                className="w-full border border-gray-300 rounded-xl p-3 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gray-900 file:text-white hover:file:bg-gray-800 file:cursor-pointer cursor-pointer transition-all"
                                onChange={(e) => setVideoUrl(e.target.files[0])}
                            />
                        </div>

                        {/* Free Preview Toggle */}
                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="isFree"
                                    className="w-5 h-5 accent-gray-900 cursor-pointer rounded"
                                    onChange={() => setIsPreviewFree(prev => !prev)}
                                />
                                <label htmlFor="isFree" className="text-sm font-medium text-gray-700 cursor-pointer">
                                    Make this lecture free for preview
                                </label>
                            </div>
                            <p className="text-xs text-gray-500 mt-2 ml-8">
                                Free lectures can be viewed by anyone without purchasing the course
                            </p>
                        </div>

                        {/* Upload Status */}
                        {loading && (
                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                <p className="text-sm text-blue-800 font-medium">
                                    Uploading video... Please wait and don't close this page.
                                </p>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className='flex items-center justify-end gap-4 pt-4 border-t border-gray-200'>
                            <button
                                type="button"
                                className='px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-xl font-medium transition-all'
                                onClick={() => navigate(`/createlecture/${courseId}`)}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-8 py-2.5 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
                                disabled={loading}
                                onClick={editLecture}
                            >
                                {loading ? <ClipLoader size={20} color='white' /> : "Update Lecture"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditLecture