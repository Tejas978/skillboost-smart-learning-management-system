import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ArrowUpRight, BookOpen } from 'lucide-react';

const CourseCard = ({
  thumbnail,
  title,
  category = "Development",
  price = 0,
  id,
  reviews = []
}) => {
  const navigate = useNavigate();

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return "0.0";
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const avgRating = calculateAverageRating(reviews);
  const ratingCount = reviews ? reviews.length : 0;

  // Format price with commas
  const formattedPrice = price.toLocaleString('en-IN', {
    maximumFractionDigits: 0,
    style: 'currency',
    currency: 'INR'
  });

  return (
    <div
      onClick={() => navigate(`/viewcourse/${id}`)}
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full max-w-sm w-full"
    >
      {/* Thumbnail Section */}
      <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
        <img
          src={thumbnail || "https://via.placeholder.com/400x225?text=No+Image"}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { e.target.src = "https://via.placeholder.com/400x225?text=Course"; }}
        />

        {/* Overlay gradient for text readability if needed, or hover effect */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />

        {/* Category Badge - Floating */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-white/95 backdrop-blur-md text-slate-700 text-xs font-bold rounded-full shadow-sm border border-slate-100 uppercase tracking-wide">
            {category}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-grow p-5 space-y-4">

        {/* Title */}
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-slate-900 line-clamp-2 leading-tight group-hover:text-gray-800 transition-colors">
            {title}
          </h3>
          <p className="text-xs text-slate-500 flex items-center gap-1">
            <BookOpen className="w-3 h-3" />
            <span>Course ID: {id?.slice(0, 6) || "..."}</span>
          </p>
        </div>

        {/* Rating Row */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-md border border-amber-100">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="font-bold text-amber-700 text-xs">{avgRating}</span>
          </div>
          <span className="text-slate-400 text-xs font-medium">({ratingCount} reviews)</span>
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-100 w-full" />

        {/* Footer: Price & Action */}
        <div className="mt-auto flex items-center justify-between pt-1">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Price</span>
            <span className="text-xl font-bold text-slate-900">{formattedPrice}</span>
          </div>

          <button className="bg-gradient-to-br from-gray-800 to-gray-900 text-white p-2.5 rounded-full hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:scale-110">
            <ArrowUpRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;