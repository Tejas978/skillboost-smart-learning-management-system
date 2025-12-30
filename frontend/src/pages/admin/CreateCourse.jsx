import axios from "axios";
import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const CreateCourse = () => {
    let navigate = useNavigate()
    let [loading, setLoading] = useState(false)
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")

    const CreateCourseHandler = async () => {
        setLoading(true)
        try {
            const result = await axios.post(serverUrl + "/api/course/create", { title, category }, { withCredentials: true })
            console.log(result.data)
            toast.success("Course Created")
            navigate("/courses")
            setTitle("")
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
            toast.error(error.response.data.message)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
                    <button
                        onClick={() => navigate("/courses")}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <FaArrowLeftLong className='w-5 h-5 text-gray-700' />
                    </button>
                    <h1 className="text-xl font-semibold text-gray-800">Create New Course</h1>
                </div>
            </div>

            {/* Form Section */}
            <div className="max-w-2xl mx-auto px-6 py-12">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                    <div className="mb-8 text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Your Course</h2>
                        <p className="text-gray-600">Fill in the basic details to get started</p>
                    </div>

                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        {/* Course Title */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Course Title
                            </label>
                            <input
                                type="text"
                                placeholder="e.g., Complete Web Development Bootcamp"
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                                onChange={(e) => setTitle(e.target.value)} 
                                value={title}
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Category
                            </label>
                            <select
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all appearance-none cursor-pointer"
                                onChange={(e) => setCategory(e.target.value)}
                                value={category}
                            >
                                <option value="">Select a category</option>
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

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-gray-900 text-white py-3.5 px-4 rounded-xl font-semibold hover:bg-gray-800 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg flex items-center justify-center"
                            disabled={loading || !title || !category}
                            onClick={CreateCourseHandler}
                        >
                            {loading ? <ClipLoader size={24} color='white' /> : "Create Course"}
                        </button>

                        {/* Helper Text */}
                        <p className="text-sm text-gray-500 text-center mt-4">
                            You can add more details after creating the course
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateCourse;