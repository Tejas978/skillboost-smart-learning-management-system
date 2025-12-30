import React, { useEffect, useRef, useState } from 'react'
import img from "../../assets/empty.jpg"
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from 'react-router-dom';
import { serverUrl } from '../../App';
import { MdEdit } from "react-icons/md";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import { setCourseData } from '../../redux/courseSlice';

function AddCourses() {
    const navigate = useNavigate()
    const { courseId } = useParams()

    const [selectedCourse, setSelectedCourse] = useState(null)
    const [title, setTitle] = useState("")
    const [subTitle, setSubTitle] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [level, setLevel] = useState("")
    const [price, setPrice] = useState("")
    const [isPublished, setIsPublished] = useState(false)
    const thumb = useRef()
    const [frontendImage, setFrontendImage] = useState(null)
    const [backendImage, setBackendImage] = useState(null)
    let [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const { courseData } = useSelector(state => state.course)

    const getCourseById = async () => {
        try {
            const result = await axios.get(serverUrl + `/api/course/getcourse/${courseId}`, { withCredentials: true })
            setSelectedCourse(result.data)
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (selectedCourse) {
            setTitle(selectedCourse.title || "")
            setSubTitle(selectedCourse.subTitle || "")
            setDescription(selectedCourse.description || "")
            setCategory(selectedCourse.category || "")
            setLevel(selectedCourse.level || "")
            setPrice(selectedCourse.price || "")
            setFrontendImage(selectedCourse.thumbnail || img)
            setIsPublished(selectedCourse?.isPublished)
        }
    }, [selectedCourse])

    useEffect(() => {
        getCourseById()
    }, [])

    const handleThumbnail = (e) => {
        const file = e.target.files[0]
        setBackendImage(file)
        setFrontendImage(URL.createObjectURL(file))
    }

    const editCourseHandler = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append("title", title);
        formData.append("subTitle", subTitle);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("level", level);
        formData.append("price", price);
        formData.append("thumbnail", backendImage);
        formData.append("isPublished", isPublished);

        try {
            const result = await axios.post(
                `${serverUrl}/api/course/editcourse/${courseId}`,
                formData,
                { withCredentials: true }
            );

            const updatedCourse = result.data;
            if (updatedCourse.isPublished) {
                const updatedCourses = courseData.map(c =>
                    c._id === courseId ? updatedCourse : c
                );
                if (!courseData.some(c => c._id === courseId)) {
                    updatedCourses.push(updatedCourse);
                }
                dispatch(setCourseData(updatedCourses));
            } else {
                const filteredCourses = courseData.filter(c => c._id !== courseId);
                dispatch(setCourseData(filteredCourses));
            }

            navigate("/courses");
            toast.success("Course Updated");
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const removeCourse = async () => {
        setLoading(true)
        try {
            const result = await axios.delete(serverUrl + `/api/course/removecourse/${courseId}`, { withCredentials: true })
            toast.success("Course Deleted")
            const filteredCourses = courseData.filter(c => c._id !== courseId);
            dispatch(setCourseData(filteredCourses));
            console.log(result)
            navigate("/courses")
            setLoading(false)
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
                <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className='flex items-center gap-3'>
                        <button
                            onClick={() => navigate("/courses")}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <FaArrowLeftLong className='w-5 h-5 text-gray-700' />
                        </button>
                        <h1 className="text-xl font-semibold text-gray-800">Edit Course</h1>
                    </div>
                    <button
                        className="px-6 py-2.5 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-all hover:scale-105 shadow-lg"
                        onClick={() => navigate(`/createlecture/${selectedCourse?._id}`)}
                    >
                        Go to Lectures
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                    {/* Actions Bar */}
                    <div className="bg-gray-50 border-b border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Actions</h3>
                        <div className="flex flex-wrap gap-3">
                            {!isPublished ?
                                <button
                                    className="px-5 py-2.5 bg-green-100 text-green-700 rounded-xl font-medium hover:bg-green-200 transition-all hover:scale-105"
                                    onClick={() => setIsPublished(prev => !prev)}
                                >
                                    Publish Course
                                </button>
                                :
                                <button
                                    className="px-5 py-2.5 bg-orange-100 text-orange-700 rounded-xl font-medium hover:bg-orange-200 transition-all hover:scale-105"
                                    onClick={() => setIsPublished(prev => !prev)}
                                >
                                    Unpublish Course
                                </button>
                            }
                            <button
                                className="px-5 py-2.5 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                disabled={loading}
                                onClick={removeCourse}
                            >
                                {loading ? <ClipLoader size={20} color='white' /> : "Delete Course"}
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <form className="p-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-6">Course Information</h3>
                        </div>

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Course Title</label>
                            <input
                                type="text"
                                placeholder="Enter course title"
                                className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                            />
                        </div>

                        {/* Subtitle */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Subtitle</label>
                            <input
                                type="text"
                                placeholder="Enter subtitle"
                                className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                                onChange={(e) => setSubTitle(e.target.value)}
                                value={subTitle}
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                            <textarea
                                placeholder="Enter course description"
                                className="w-full border border-gray-300 px-4 py-3 rounded-xl h-32 resize-none focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                            ></textarea>
                        </div>

                        {/* Category, Level, Price Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Category */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                                <select
                                    className="w-full border border-gray-300 px-4 py-3 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all appearance-none cursor-pointer"
                                    onChange={(e) => setCategory(e.target.value)}
                                    value={category}
                                >
                                    <option value="">Select Category</option>
                                    <option value="App Development">App Development</option>
                                    <option value="AI/ML">AI/ML</option>
                                    <option value="AI Tools">AI Tools</option>
                                    <option value="Data Science">Data Science</option>
                                    <option value="Data Analytics">Data Analytics</option>
                                    <option value="Ethical Hacking">Ethical Hacking</option>
                                    <option value="UI UX Designing">UI UX Designing</option>
                                    <option value="Web Development">Web Development</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>

                            {/* Level */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Course Level</label>
                                <select
                                    className="w-full border border-gray-300 px-4 py-3 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all appearance-none cursor-pointer"
                                    onChange={(e) => setLevel(e.target.value)}
                                    value={level}
                                >
                                    <option value="">Select Level</option>
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                </select>
                            </div>

                            {/* Price */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Price (INR)</label>
                                <input
                                    type="number"
                                    placeholder="₹"
                                    className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                                    onChange={(e) => setPrice(e.target.value)}
                                    value={price}
                                />
                            </div>
                        </div>

                        {/* Thumbnail */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Course Thumbnail</label>
                            <input
                                type="file"
                                ref={thumb}
                                hidden
                                onChange={handleThumbnail}
                                accept='image/*'
                            />
                            <div className='relative w-full max-w-md group cursor-pointer' onClick={() => thumb.current.click()}>
                                <img
                                    src={frontendImage}
                                    alt="Course thumbnail"
                                    className='w-full h-64 object-cover rounded-xl border-2 border-gray-300 shadow-md group-hover:opacity-90 transition-opacity'
                                />
                                <div className='absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
                                    <div className='bg-white rounded-full p-3'>
                                        <MdEdit className='w-6 h-6 text-gray-900' />
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">Click image to change thumbnail</p>
                        </div>

                        {/* Action Buttons */}
                        <div className='flex items-center justify-end gap-4 pt-4 border-t border-gray-200'>
                            <button
                                className='px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-xl font-medium transition-all'
                                onClick={() => navigate("/courses")}
                            >
                                Cancel
                            </button>
                            <button
                                className='px-8 py-2.5 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg'
                                disabled={loading}
                                onClick={editCourseHandler}
                            >
                                {loading ? <ClipLoader size={20} color='white' /> : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddCourses