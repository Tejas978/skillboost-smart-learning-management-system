import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { serverUrl } from '../App';
import { HiArrowLeft } from "react-icons/hi2";
import img from "../assets/empty.jpg"
import Card from "../components/Card.jsx"
import { setSelectedCourseData } from '../redux/courseSlice';
import { FaLock, FaPlayCircle, FaStar, FaClock, FaInfinity, FaCheckCircle } from "react-icons/fa";
import { toast } from 'react-toastify';

function ViewCourse() {
  const { courseId } = useParams();
  const navigate = useNavigate()
  const {courseData} = useSelector(state=>state.course)
  const {userData} = useSelector(state=>state.user)
  const [creatorData, setCreatorData] = useState(null)
  const dispatch = useDispatch()
  const [selectedLecture, setSelectedLecture] = useState(null);
  const {lectureData} = useSelector(state=>state.lecture)
  const {selectedCourseData} = useSelector(state=>state.course)
  const [selectedCreatorCourse, setSelectedCreatorCourse] = useState([])
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleReview = async () => {
    try {
      const result = await axios.post(serverUrl + "/api/review/givereview", {rating, comment, courseId}, {withCredentials:true})
      toast.success("Review Added")
      console.log(result.data)
      setRating(0)
      setComment("")
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const avgRating = calculateAverageRating(selectedCourseData?.reviews);

  const fetchCourseData = async () => {
    courseData.map((item) => {
      if (item._id === courseId) {
        dispatch(setSelectedCourseData(item))
        return null;
      }
    })
  }

  const checkEnrollment = () => {
    const verify = userData?.enrolledCourses?.some(c => {
      const enrolledId = typeof c === 'string' ? c : c._id;
      return enrolledId?.toString() === courseId?.toString();
    });
    if (verify) {
      setIsEnrolled(true);
    }
  };

  useEffect(() => {
    fetchCourseData()
    checkEnrollment()
  }, [courseId, courseData, lectureData])

  useEffect(() => {
    const getCreator = async () => {
      if (selectedCourseData?.creator) {
        try {
          const result = await axios.post(
            `${serverUrl}/api/course/getcreator`,
            { userId: selectedCourseData.creator },
            { withCredentials: true }
          );
          setCreatorData(result.data);
        } catch (error) {
          console.error("Error fetching creator:", error);
        }
      }
    };
    getCreator();
  }, [selectedCourseData]);

  useEffect(() => {
    if (creatorData?._id && courseData.length > 0) {
      const creatorCourses = courseData.filter(
        (course) => course.creator === creatorData._id && course._id !== courseId
      );
      setSelectedCreatorCourse(creatorCourses);
    }
  }, [creatorData, courseData]);

  const handleEnroll = async (courseId, userId) => {
    try {
      const orderData = await axios.post(serverUrl + "/api/payment/create-order", {
        courseId,
        userId
      }, {withCredentials:true});

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.data.amount,
        currency: "INR",
        name: "Skill Boost",
        description: "Course Enrollment Payment",
        order_id: orderData.data.id,
        handler: async function (response) {
          try {
            const verifyRes = await axios.post(serverUrl + "/api/payment/verify-payment", {
              ...response,
              courseId,
              userId
            }, { withCredentials: true });
            setIsEnrolled(true)
            toast.success(verifyRes.data.message);
          } catch (verifyError) {
            toast.error("Payment verification failed.");
          }
        },
      };
      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (err) {
      toast.error("Something went wrong while enrolling.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="group inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-all duration-200"
        >
          <div className="w-10 h-10 rounded-xl bg-white border-2 border-gray-200 flex items-center justify-center group-hover:border-gray-900 group-hover:bg-gray-900 transition-all duration-200 shadow-sm">
            <HiArrowLeft className="w-5 h-5 group-hover:text-white transition-colors duration-200" />
          </div>
          <span className="font-semibold text-sm">Back to Courses</span>
        </button>

        {/* Hero Section */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden mb-8">
          <div className="grid lg:grid-cols-2 gap-8 p-8">
            
            {/* Course Image */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <img
                src={selectedCourseData?.thumbnail || img}
                alt="Course Thumbnail"
                className="relative rounded-2xl w-full h-full object-cover shadow-2xl"
              />
            </div>

            {/* Course Details */}
            <div className="flex flex-col justify-center space-y-6">
              <div>
                <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                  {selectedCourseData?.category}
                </span>
                <h1 className="text-4xl font-bold text-gray-900 mb-3">{selectedCourseData?.title}</h1>
                <p className="text-lg text-gray-600">{selectedCourseData?.subTitle}</p>
              </div>

              {/* Rating & Stats */}
              <div className="flex items-center gap-6 py-4 border-y border-gray-200">
                <div className="flex items-center gap-2">
                  <FaStar className="text-yellow-400 w-5 h-5" />
                  <span className="text-lg font-bold text-gray-900">{avgRating}</span>
                  <span className="text-sm text-gray-500">(1,200 reviews)</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <FaClock className="w-4 h-4" />
                  <span className="text-sm">10+ hours</span>
                </div>
              </div>

             {/* Price */}
{(() => {
  const DISCOUNT_PERCENT = 50;

  const originalPrice = selectedCourseData?.price || 0;
  const discountedPrice = Math.round(
    originalPrice - (originalPrice * DISCOUNT_PERCENT) / 100
  );

  return (
    <div className="flex items-baseline gap-3">
      {/* Final Price */}
      <span className="text-4xl font-bold text-gray-900">
        ₹ {discountedPrice-1}
      </span>

      {/* Original Price */}
      <span className="text-xl text-gray-400 line-through">
        ₹ {originalPrice+1}
      </span>

      {/* Discount */}
      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-bold">
        {DISCOUNT_PERCENT}% OFF
      </span>
    </div>
  );
})()}


              {/* Features */}
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-gray-700">
                  <FaCheckCircle className="text-green-500 w-5 h-5" />
                  <span>10+ hours of video content</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <FaInfinity className="text-blue-500 w-5 h-5" />
                  <span>Lifetime access to materials</span>
                </div>
              </div>

              {/* Action Button */}
              {!isEnrolled ? (
                <button
                  onClick={() => handleEnroll(courseId, userData._id)}
                  className="w-full py-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-xl font-bold text-lg hover:from-slate-800 hover:to-slate-700 transition-all duration-200 shadow-lg shadow-slate-900/30"
                >
                  Enroll Now
                </button>
              ) : (
                <button
                  onClick={() => navigate(`/viewlecture/${courseId}`)}
                  className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold text-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg shadow-green-500/30 flex items-center justify-center gap-2"
                >
                  <FaPlayCircle className="w-5 h-5" />
                  Watch Now
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Course Content Sections */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Column - Info Cards */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* What You'll Learn */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What You'll Learn</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-500 w-5 h-5 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Learn {selectedCourseData?.category} from Beginning</span>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-500 w-5 h-5 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Build real-world projects</span>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-500 w-5 h-5 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Master advanced concepts</span>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-500 w-5 h-5 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Get industry-ready skills</span>
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
              <p className="text-gray-700 leading-relaxed">Basic programming knowledge is helpful but not required. Anyone with a passion to learn can enroll in this course.</p>
            </div>

            {/* Who This Course Is For */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Who This Course is For</h2>
              <p className="text-gray-700 leading-relaxed">Beginners, aspiring developers, and professionals looking to upgrade their skills in {selectedCourseData?.category}.</p>
            </div>

            {/* Course Curriculum & Preview */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Course Curriculum</h2>
              <p className="text-sm text-gray-500 mb-6">{selectedCourseData?.lectures?.length} Lectures</p>
              
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Lecture List */}
                <div className="space-y-2">
                  {selectedCourseData?.lectures?.map((lecture, index) => (
                    <button
                      key={index}
                      disabled={!lecture.isPreviewFree}
                      onClick={() => lecture.isPreviewFree && setSelectedLecture(lecture)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200 text-left ${
                        lecture.isPreviewFree
                          ? "hover:bg-blue-50 hover:border-blue-300 cursor-pointer border-gray-200"
                          : "cursor-not-allowed opacity-50 border-gray-200"
                      } ${
                        selectedLecture?.lectureTitle === lecture.lectureTitle
                          ? "bg-blue-50 border-blue-300"
                          : ""
                      }`}
                    >
                      <span className={lecture.isPreviewFree ? "text-blue-500" : "text-gray-400"}>
                        {lecture.isPreviewFree ? <FaPlayCircle className="w-5 h-5" /> : <FaLock className="w-4 h-4" />}
                      </span>
                      <span className="text-sm font-medium text-gray-800 flex-1">{lecture.lectureTitle}</span>
                    </button>
                  ))}
                </div>

                {/* Video Preview */}
                <div className="space-y-4">
                  <div className="aspect-video w-full rounded-xl overflow-hidden bg-black flex items-center justify-center shadow-lg">
                    {selectedLecture?.videoUrl ? (
                      <video
                        src={selectedLecture.videoUrl}
                        controls
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-white text-sm">Select a preview lecture</span>
                    )}
                  </div>
                  {selectedLecture && (
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{selectedLecture.lectureTitle}</h3>
                      <p className="text-sm text-gray-600">{selectedCourseData?.title}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Write a Review</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Your Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className="transition-transform hover:scale-110"
                      >
                        <FaStar className={`w-8 h-8 ${star <= rating ? "fill-yellow-400" : "fill-gray-300"}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Your Comment</label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your experience with this course..."
                    className="w-full border-2 border-gray-200 rounded-xl p-4 focus:outline-none focus:border-slate-900 transition-colors duration-200 resize-none"
                    rows="4"
                  />
                </div>
                <button
                  onClick={handleReview}
                  className="px-6 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors duration-200"
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Instructor & More Courses */}
          <div className="space-y-6">
            
            {/* Instructor Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Your Educator</h3>
              <div className="flex items-start gap-4">
                <img
                  src={creatorData?.photoUrl || img}
                  alt="Instructor"
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-900">{creatorData?.name}</h4>
                  <p className="text-sm text-gray-600 line-clamp-2 mt-1">{creatorData?.description}</p>
                  <p className="text-xs text-gray-500 mt-2">{creatorData?.email}</p>
                </div>
              </div>
            </div>

            {/* More Courses */}
            {selectedCreatorCourse.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">More by this Instructor</h3>
                <div className="space-y-4">
                  {selectedCreatorCourse.slice(0, 3).map((item, index) => (
                    <Card key={index} thumbnail={item.thumbnail} title={item.title} id={item._id} price={item.price} category={item.category} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewCourse