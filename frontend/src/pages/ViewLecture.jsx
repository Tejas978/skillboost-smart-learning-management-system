import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { FaPlayCircle, FaCheckCircle } from 'react-icons/fa';
import { HiArrowLeft } from "react-icons/hi2";

function ViewLecture() {
  const { courseId } = useParams();
  const { courseData } = useSelector((state) => state.course);
  const {userData} = useSelector((state) => state.user)
  const selectedCourse = courseData?.find((course) => course._id === courseId);

  const [selectedLecture, setSelectedLecture] = useState(
    selectedCourse?.lectures?.[0] || null
  );
  const [completedLectures, setCompletedLectures] = useState([]);
  const navigate = useNavigate()
  const courseCreator = userData?._id === selectedCourse?.creator ? userData : null;

  const handleLectureComplete = (lectureId) => {
    if (!completedLectures.includes(lectureId)) {
      setCompletedLectures([...completedLectures, lectureId]);
    }
  };

  const progress = selectedCourse?.lectures?.length > 0 
    ? Math.round((completedLectures.length / selectedCourse.lectures.length) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/")}
                className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-slate-900 border border-gray-200 hover:border-slate-900 flex items-center justify-center transition-all duration-200 group"
              >
                <HiArrowLeft className="w-5 h-5 text-gray-700 group-hover:text-white transition-colors duration-200" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{selectedCourse?.title}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                  <span className="flex items-center gap-1">
                    <span className="font-semibold text-gray-700">{selectedCourse?.category}</span>
                  </span>
                  <span>•</span>
                  <span>{selectedCourse?.lectures?.length || 0} Lectures</span>
                </div>
              </div>
            </div>
            
            {/* Progress */}
            <div className="hidden md:flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-700">Course Progress</p>
                <p className="text-xs text-gray-500">{completedLectures.length}/{selectedCourse?.lectures?.length || 0} completed</p>
              </div>
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className="text-sm font-bold text-gray-900">{progress}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Left - Video Player */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              
              {/* Video */}
              <div className="relative aspect-video bg-black">
                {selectedLecture?.videoUrl ? (
                  <video
                    src={selectedLecture.videoUrl}
                    controls
                    className="w-full h-full object-contain"
                    crossOrigin="anonymous"
                    onEnded={() => handleLectureComplete(selectedLecture._id)}
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <FaPlayCircle className="w-16 h-16 mb-4 opacity-50" />
                    <p className="text-lg">Select a lecture to start watching</p>
                  </div>
                )}
              </div>

              {/* Lecture Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {selectedLecture?.lectureTitle || 'No lecture selected'}
                    </h2>
                    {selectedLecture && (
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-sm font-semibold">
                          <FaPlayCircle className="w-3 h-3" />
                          Lecture {selectedCourse?.lectures?.findIndex(l => l._id === selectedLecture._id) + 1}
                        </span>
                        {completedLectures.includes(selectedLecture._id) && (
                          <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-600 rounded-lg text-sm font-semibold">
                            <FaCheckCircle className="w-3 h-3" />
                            Completed
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  {selectedLecture && !completedLectures.includes(selectedLecture._id) && (
                    <button
                      onClick={() => handleLectureComplete(selectedLecture._id)}
                      className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold text-sm transition-colors duration-200 whitespace-nowrap"
                    >
                      Mark Complete
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Course Description */}
            <div className="mt-6 bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">About This Course</h3>
              <p className="text-gray-600 leading-relaxed">
                {selectedCourse?.subTitle || 'Learn and master the concepts covered in this comprehensive course.'}
              </p>
            </div>
          </div>

          {/* Right - Lectures List & Instructor */}
          <div className="space-y-6">
            
            {/* Lectures List */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Course Content</h2>
                <span className="text-sm text-gray-500">{selectedCourse?.lectures?.length || 0} lectures</span>
              </div>
              
              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {selectedCourse?.lectures?.length > 0 ? (
                  selectedCourse.lectures.map((lecture, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedLecture(lecture)}
                      className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 text-left group ${
                        selectedLecture?._id === lecture._id
                          ? 'bg-slate-50 border-slate-300 shadow-sm'
                          : 'hover:bg-gray-50 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        completedLectures.includes(lecture._id)
                          ? 'bg-green-100'
                          : selectedLecture?._id === lecture._id
                          ? 'bg-slate-900'
                          : 'bg-gray-100 group-hover:bg-gray-200'
                      }`}>
                        {completedLectures.includes(lecture._id) ? (
                          <FaCheckCircle className="text-green-600 w-4 h-4" />
                        ) : (
                          <FaPlayCircle className={`w-4 h-4 ${
                            selectedLecture?._id === lecture._id ? 'text-white' : 'text-gray-600'
                          }`} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-gray-900 truncate">
                          {lecture.lectureTitle}
                        </h4>
                        <p className="text-xs text-gray-500 mt-0.5">Lecture {index + 1}</p>
                      </div>
                    </button>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-8">No lectures available</p>
                )}
              </div>
            </div>

            {/* Instructor Card */}
            {courseCreator && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Your Instructor</h3>
                <div className="flex items-start gap-4">
                  <img
                    src={courseCreator.photoUrl || '/default-avatar.png'}
                    alt="Instructor"
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base font-bold text-gray-900">{courseCreator.name}</h4>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                      {courseCreator.description || 'Experienced instructor passionate about teaching.'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
}

export default ViewLecture;