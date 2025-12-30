import React, { useEffect, useState } from 'react'
import ReviewCard from './ReviewCard'
import { useSelector } from 'react-redux';
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { FaStar } from "react-icons/fa6";

function ReviewPage() {
  const [latestReview, setLatestReview] = useState([]);
  const { allReview } = useSelector(state => state.review)

  useEffect(() => {
    setLatestReview(allReview.slice(0, 6));
  }, [allReview])


  
  // Calculate average rating
  const averageRating = latestReview.length > 0
    ? (latestReview.reduce((acc, curr) => acc + curr.rating, 0) / latestReview.length).toFixed(1)
    : 0;

  const satisfactionRate =
    averageRating > 0 ? Math.round((averageRating / 5) * 100) : 0;

  return (
    <div className='w-full py-12 lg:py-16 bg-gradient-to-b from-white to-gray-50'>
      <div className='max-w-7xl mx-auto px-4 md:px-8'>

        {/* Header Section */}
        <div className='flex flex-col items-center text-center mb-16'>

          {/* Badge */}
          <div className='inline-flex items-center gap-3 px-4 py-2 bg-gray-900 rounded-full mb-6'>
            <TfiLayoutLineSolid className='w-5 h-5 text-gray-300' />
            <span className='text-sm font-semibold text-gray-300 uppercase tracking-wider'>Student Testimonials</span>
          </div>

          {/* Main Heading */}
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight max-w-4xl'>
            Real Reviews from Real Learners
          </h1>

          {/* Description */}
          <p className='text-lg text-gray-600 leading-relaxed max-w-3xl mb-8'>
            Discover how Skill Boost is transforming learning experiences through real feedback from students and professionals worldwide.
          </p>

          {/* Stats Row */}
          <div className='flex flex-wrap items-center justify-center gap-8 mt-4'>
            <div className='flex items-center gap-2'>
              <div className='flex'>
                {Array(5).fill(0).map((_, i) => (
                  <FaStar key={i} className='text-yellow-400 text-xl' />
                ))}
              </div>
              <span className='text-2xl font-bold text-gray-900'>{averageRating}</span>
              <span className='text-gray-500'>/ 5.0</span>
            </div>
            <div className='h-8 w-px bg-gray-300'></div>
            <div className='text-center'>
              <p className='text-2xl font-bold text-gray-900'>{allReview.length}+</p>
              <p className='text-sm text-gray-500'>Total Reviews</p>
            </div>
            <div className='h-8 w-px bg-gray-300'></div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {satisfactionRate}%
              </p>
              <p className="text-sm text-gray-500">Satisfaction Rate</p>
            </div>

          </div>
        </div>

        {/* Reviews Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12'>
          {
            latestReview.map((item, index) => (
              <ReviewCard
                key={index}
                rating={item.rating}
                image={item.user.photoUrl}
                text={item.comment}
                name={item.user.name}
                role={item.user.role}
              />
            ))
          }
        </div>

        {/* Empty State */}
        {latestReview.length === 0 && (
          <div className='text-center py-20'>
            <div className='w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4'>
              <FaStar className='text-gray-400 text-3xl' />
            </div>
            <h3 className='text-xl font-semibold text-gray-700 mb-2'>No Reviews Yet</h3>
            <p className='text-gray-500'>Be the first to share your experience!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ReviewPage