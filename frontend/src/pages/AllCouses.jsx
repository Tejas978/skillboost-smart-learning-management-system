import React, { useEffect, useState } from 'react';
import Card from "../components/Card.jsx";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import ai from '../assets/SearchAi.png';
import { useSelector } from 'react-redux';
import { Filter, X } from 'lucide-react';

function AllCourses() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [filterCourses, setFilterCourses] = useState([]);
  const { courseData } = useSelector(state => state.course);

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setCategory(prev => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let courseCopy = courseData.slice();

    if (category.length > 0) {
      courseCopy = courseCopy.filter(item => category.includes(item.category));
    }

    setFilterCourses(courseCopy);
  };

  useEffect(() => {
    setFilterCourses(courseData);
  }, [courseData]);

  useEffect(() => {
    applyFilter();
  }, [category]);

  const clearFilters = () => {
    setCategory([]);
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    if (isSidebarVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSidebarVisible]);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50">
      <Nav />

      {/* Mobile Filter Toggle Button - Floating at Bottom */}
      <button
        onClick={() => setIsSidebarVisible(prev => !prev)}
        className="fixed bottom-6 right-4 z-50 bg-gray-900 text-white px-4 py-3 rounded-full md:hidden shadow-2xl hover:bg-gray-800 transition-all flex items-center gap-2 text-sm font-semibold hover:scale-105"
      >
        <Filter className="w-5 h-5" />
        Filters
        {category.length > 0 && (
          <span className="bg-white text-gray-900 text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
            {category.length}
          </span>
        )}
      </button>

      {/* Overlay for mobile */}
      {isSidebarVisible && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarVisible(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`w-[85%] max-w-[320px] md:w-[280px] h-screen overflow-y-auto bg-gradient-to-b from-zinc-950 via-zinc-900 to-black fixed top-0 left-0 p-4 pt-5 border-r border-zinc-800 shadow-2xl transition-transform duration-300 ease-out z-50
        ${isSidebarVisible ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 md:z-40`}>

        {/* Header */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-14">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Filter className="w-5 h-5 text-zinc-300" />
              Filters
            </h2>
            <div className="flex items-center gap-2">
              {/* Close button for mobile */}
              <button
                onClick={() => setIsSidebarVisible(false)}
                className="md:hidden p-2 hover:bg-zinc-800 rounded-lg transition-colors border border-zinc-800 hover:border-zinc-700"
              >
                <X className='text-zinc-300 w-4 h-4' />
              </button>
              {/* Back button for desktop */}
              <button
                onClick={() => navigate("/")}
                className="hidden md:block p-2 hover:bg-zinc-800 rounded-lg transition-colors border border-zinc-800 hover:border-zinc-700"
              >
                <FaArrowLeftLong className='text-zinc-300 w-4 h-4' />
              </button>
            </div>
          </div>

          {/* Clear Filters */}
          {category.length > 0 && (
            <button
              onClick={clearFilters}
              className="w-full px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-medium transition-all text-sm flex items-center justify-center gap-2 border border-zinc-700"
            >
              <X className="w-4 h-4" />
              Clear All ({category.length})
            </button>
          )}
        </div>

        {/* AI Search Button */}
        <button
          className='w-full mb-5 px-3 py-2.5 bg-gradient-to-r from-zinc-700 to-zinc-800 text-white rounded-xl font-semibold hover:from-zinc-600 hover:to-zinc-700 transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] border border-zinc-700 text-sm'
          onClick={() => {
            navigate("/searchwithai");
            setIsSidebarVisible(false);
          }}
        >
          <img src={ai} className='w-5 h-5 rounded-full' alt="AI" />
          Search with AI
        </button>

        {/* Filter Form */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-lg">
          <h3 className="text-xs font-semibold text-zinc-400 mb-3 uppercase tracking-wide">Categories</h3>
          <form className="space-y-2 text-sm" onSubmit={(e) => e.preventDefault()}>
            {[
              'App Development',
              'AI/ML',
              'AI Tools',
              'Data Science',
              'Data Analytics',
              'Ethical Hacking',
              'UI UX Designing',
              'Web Development',
              'Others'
            ].map((cat) => (
              <label
                key={cat}
                className="flex items-center gap-2.5 cursor-pointer hover:bg-zinc-800 p-2 rounded-lg transition-colors group border border-transparent hover:border-zinc-700"
              >
                <input
                  type="checkbox"
                  className="accent-zinc-200 w-4 h-4 rounded cursor-pointer flex-shrink-0"
                  value={cat}
                  onChange={toggleCategory}
                  checked={category.includes(cat)}
                />
                <span className="text-zinc-400 group-hover:text-zinc-200 transition-colors text-sm">
                  {cat}
                </span>
              </label>
            ))}
          </form>
        </div>

            
        
        {/* Mobile Bottom Action */}
        <div className="md:hidden mt-5 pt-4 border-t border-zinc-800">
          <button
            onClick={() => setIsSidebarVisible(false)}
            className="w-full px-4 py-2.5 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-all text-sm"
          >
            View {filterCourses?.length} {filterCourses?.length === 1 ? 'Course' : 'Courses'}
          </button>
        </div>
      </aside>

      {/* Main Courses Section */}
      <main className="w-full transition-all duration-300 pt-20 md:pt-24 pb-20 md:pb-12 md:pl-[280px] px-3 md:px-0">
        <div className="max-w-7xl mx-auto md:px-6">
          {/* Header */}
          <div className="mb-5 md:mb-8">
            <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-1.5 md:mb-2">
              All Courses
            </h1>
            <p className="text-xs md:text-base text-gray-600">
              {filterCourses?.length} {filterCourses?.length === 1 ? 'course' : 'courses'}
              {category.length > 0 && (
                <span className="hidden sm:inline"> in {category.join(', ')}</span>
              )}
            </p>
            {category.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3 sm:hidden">
                {category.map((cat) => (
                  <span
                    key={cat}
                    className="inline-flex items-center gap-1.5 bg-gray-900 text-white px-2.5 py-1 rounded-lg text-xs font-medium"
                  >
                    {cat}
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-gray-300"
                      onClick={() => toggleCategory({ target: { value: cat } })}
                    />
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Courses Grid */}
          {filterCourses?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filterCourses.map((item, index) => (
                <Card
                  key={index}
                  thumbnail={item.thumbnail}
                  title={item.title}
                  price={item.price}
                  category={item.category}
                  id={item._id}
                  reviews={item.reviews}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 md:py-20">
              <div className="text-center px-4">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                  <Filter className="w-10 h-10 md:w-12 md:h-12 text-gray-400" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">No courses found</h3>
                <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
                  Try adjusting your filters to see more results
                </p>
                {category.length > 0 && (
                  <button
                    onClick={clearFilters}
                    className="px-5 py-2.5 md:px-6 md:py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all hover:scale-105 text-sm md:text-base"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default AllCourses;