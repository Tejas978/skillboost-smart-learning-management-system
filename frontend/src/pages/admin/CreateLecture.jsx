import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaArrowLeft, FaEdit } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { serverUrl } from '../../App';
import { ClipLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux';
import { setLectureData } from '../../redux/lectureSlice';

function CreateLecture() {
    const navigate = useNavigate()
    const { courseId } = useParams()
    const [lectureTitle, setLectureTitle] = useState("")
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const { lectureData } = useSelector(state => state.lecture)

    const createLectureHandler = async () => {
        setLoading(true)
        try {
            const result = await axios.post(serverUrl + `/api/course/createlecture/${courseId}`, { lectureTitle }, { withCredentials: true })
            console.log(result.data)
            dispatch(setLectureData([...lectureData, result.data.lecture]))
            toast.success("Lecture Created")
            setLoading(false)
            setLectureTitle("")
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
            setLoading(false)
        }
    }

    useEffect(() => {
        const getLecture = async () => {
            try {
                const result = await axios.get(serverUrl + `/api/course/getcourselecture/${courseId}`, { withCredentials: true })
                console.log(result.data)
                dispatch(setLectureData(result.data.lectures))
            } catch (error) {
                console.log(error)
                toast.error(error.response.data.message)
            }
        }
        getLecture()
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
                    <button
                        onClick={() => navigate(`/addcourses/${courseId}`)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <FaArrowLeft className="w-5 h-5 text-gray-700" />
                    </button>
                    <h1 className="text-xl font-semibold text-gray-800">Course Lectures</h1>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-6 py-8">
                {/* Create Lecture Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Add New Lecture</h2>
                        <p className="text-gray-600">Create a new lecture and add video content to your course</p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Lecture Title
                            </label>
                            <input
                                type="text"
                                placeholder="e.g., Introduction to MERN Stack"
                                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                                onChange={(e) => setLectureTitle(e.target.value)}
                                value={lectureTitle}
                            />
                        </div>

                        <button
                            className="w-full px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
                            disabled={loading || !lectureTitle}
                            onClick={createLectureHandler}
                        >
                            {loading ? <ClipLoader size={20} color='white' /> : "+ Create Lecture"}
                        </button>
                    </div>
                </div>

                {/* Lecture List Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                    <div className="mb-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                            Course Lectures ({lectureData?.length || 0})
                        </h3>
                        <p className="text-sm text-gray-600">Manage and edit your course lectures</p>
                    </div>

                    {lectureData?.length > 0 ? (
                        <div className="space-y-3">
                            {lectureData.map((lecture, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-50 rounded-xl flex justify-between items-center p-4 hover:bg-gray-100 transition-all border border-gray-200 group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-gray-900 text-white rounded-lg flex items-center justify-center font-semibold text-sm">
                                            {index + 1}
                                        </div>
                                        <span className="font-medium text-gray-900">{lecture.lectureTitle}</span>
                                    </div>
                                    <button
                                        onClick={() => navigate(`/editlecture/${courseId}/${lecture._id}`)}
                                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-white rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                    >
                                        <FaEdit className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                            <p className="text-gray-600 text-sm">No lectures yet. Create your first lecture above!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CreateLecture