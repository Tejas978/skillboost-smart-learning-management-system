import React, { useEffect, useState } from 'react'
import Card from "./Card.jsx"
import { useSelector } from 'react-redux';
import { ArrowRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';

function Cardspage() {
  const [popularCourses, setPopularCourses] = useState([]);
  const { courseData } = useSelector(state => state.course)
  const navigate = useNavigate()

  useEffect(() => {
    setPopularCourses(courseData.slice(0, 6));
  }, [courseData])

  return (
   <div className="
  relative
  px-6
  py-10 sm:py-12 lg:py-8
">

      <div className='max-w-7xl mx-auto'>
        {/* Header Section */}
        <div className='text-center mb-16'>
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6'>
            Our Popular Courses
          </h1>
          <p className='max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed'>
            Explore top-rated courses designed to boost your skills, enhance careers, and unlock opportunities in tech, AI, business, and beyond.
          </p>
        </div>

        {/* Cards Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16'>
          {popularCourses.map((item, index) => (
            <Card 
              key={index} 
              id={item._id} 
              thumbnail={item.thumbnail} 
              title={item.title} 
              price={item.price} 
              category={item.category} 
              reviews={item.reviews}  
            />
          ))}
        </div>

        {/* View All Button */}
        <div className='flex justify-center'>
          <button 
            className='group px-8 py-4 bg-gray-900 text-white rounded-xl font-semibold text-lg hover:bg-gray-800 transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl hover:scale-105'
            onClick={() => navigate("/allcourses")}
          >
            View All Courses
            <ArrowRight className='w-6 h-6 group-hover:translate-x-1 transition-transform duration-300' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cardspage