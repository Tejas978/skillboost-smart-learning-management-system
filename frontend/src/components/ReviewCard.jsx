import React from "react";
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import { FaQuoteLeft } from "react-icons/fa";

const ReviewCard = ({ text, name, image, rating, role }) => {
  return (
    <div className="relative bg-white p-7 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 w-full border border-gray-200 hover:border-gray-300 group overflow-hidden">
      
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400"></div>
      
      {/* Quote Icon */}
      <div className="absolute top-5 right-5 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
        <FaQuoteLeft className="text-gray-900 text-6xl" />
      </div>

      {/* Rating Stars */}
      <div className="flex items-center gap-1 mb-5 relative z-10">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <span key={i} className="text-yellow-400 text-lg drop-shadow-sm">
              {i < rating ? <FaStar /> : <FaRegStar className="text-gray-300" />}
            </span>
          ))}
        <span className="ml-2 text-sm text-gray-600 font-semibold bg-gray-100 px-2 py-0.5 rounded-full">{rating}.0</span>
      </div>

      {/* Review Text */}
      <p className="text-gray-700 text-base leading-relaxed mb-6 relative z-10 min-h-[80px]">
        "{text}"
      </p>

      {/* Divider Line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-5"></div>

      {/* Reviewer Info */}
      <div className="flex items-center gap-4 relative z-10">
        <div className="relative flex-shrink-0">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 opacity-20 blur-md"></div>
          <img
            src={image}
            alt={name}
            className="relative w-14 h-14 rounded-full object-cover border-3 border-white shadow-md group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="overflow-hidden">
          <h4 className="font-bold text-gray-900 text-base mb-0.5 truncate">{name}</h4>
          <p className="text-sm text-gray-500 truncate">{role}</p>
        </div>
      </div>

      {/* Subtle Background Gradient on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/0 to-yellow-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"></div>
    </div>
  );
};

export default ReviewCard;