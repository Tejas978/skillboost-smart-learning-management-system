import React, { useState } from 'react'
import ai from "../assets/ai.png"
import ai1 from "../assets/SearchAi.png"
import { RiMicAiFill } from "react-icons/ri";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { BiLoaderAlt } from "react-icons/bi";
import axios from 'axios';
import { serverUrl } from '../App';
import { useNavigate } from 'react-router-dom';
import start from "../assets/start.mp3"

function SearchWithAi() {
  const [input, setInput] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const startSound = new Audio(start)

  function speak(message) {
    let utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  const handleSearch = async () => {
    if (!recognition) {
      alert("Speech recognition not supported in your browser");
      return;
    }

    setListening(true);
    startSound.play();
    recognition.start();

    recognition.onresult = async (e) => {
      const transcript = e.results[0][0].transcript.trim();
      setInput(transcript);
      await handleRecommendation(transcript);
    };

    recognition.onerror = () => {
      setListening(false);
      alert("Could not recognize speech. Please try again.");
    };
  };

  const handleRecommendation = async (query) => {
    if (!query.trim()) return;

    try {
      setLoading(true);
      const result = await axios.post(`${serverUrl}/api/ai/search`, { input: query }, { withCredentials: true });
      setRecommendations(result.data);

      if (result.data.length > 0) {
        speak("These are the top courses I found for you");
      } else {
        speak("No courses found");
      }

      setListening(false);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setListening(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex flex-col items-center px-3 sm:px-4 py-6 sm:py-12 relative overflow-hidden">

      {/* Animated Background Orbs - Optimized for mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-40 sm:w-72 h-40 sm:h-72 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-48 sm:w-96 h-48 sm:h-96 bg-pink-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-32 sm:w-80 h-32 sm:h-80 bg-blue-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Back Button - Compact for mobile */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-3 sm:top-6 left-3 sm:left-6 flex items-center gap-1.5 sm:gap-2 text-gray-400 hover:text-white transition-all duration-300 group z-20"
      >
        <div className="bg-gray-800 p-1.5 sm:p-2 rounded-lg group-hover:bg-gray-700 transition-colors">
          <FaArrowLeftLong className='w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform duration-300' />
        </div>
        <span className="text-xs sm:text-sm font-medium hidden xs:inline">Back</span>
      </button>

      {/* Header Section - Responsive sizing */}
      <div className="text-center mb-6 sm:mb-12 mt-12 sm:mt-16 relative z-10 max-w-4xl w-full">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full border border-purple-500/30 backdrop-blur-sm">
          <HiSparkles className="text-purple-400 w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
          <span className="text-xs sm:text-sm text-purple-300 font-semibold uppercase tracking-wide">AI-Powered Learning</span>
        </div>

        <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent leading-tight px-2">
          Find Your Perfect Course
        </h1>

        <p className="text-gray-400 text-sm sm:text-base lg:text-lg px-4">
          Discover personalized learning paths powered by artificial intelligence
        </p>
      </div>

      {/* Search Container - Responsive padding and border radius */}
      <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-gray-700/50 shadow-2xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 w-full max-w-3xl relative z-10">

        {/* Search Input - Stacked layout on very small screens */}
        <div className="relative group">
          <div className="flex flex-col xs:flex-row items-stretch xs:items-center bg-gray-700/50 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-gray-600 group-hover:border-purple-500/50 focus-within:border-purple-500 transition-all duration-300 shadow-lg gap-2 xs:gap-0 p-2 xs:p-0">

            {/* Search Input Row */}
            <div className="flex items-center flex-1 order-1 xs:order-none">
              <div className="pl-3 sm:pl-5 text-gray-400 group-focus-within:text-purple-400 transition-colors">
                <FaSearch className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>

              <input
                type="text"
                className="flex-grow px-3 sm:px-4 py-3 sm:py-4 bg-transparent text-white placeholder-gray-500 focus:outline-none text-sm sm:text-base"
                placeholder="What do you want to learn?"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !loading && handleRecommendation(input)}
              />
            </div>

            {/* Buttons Row - Better mobile layout */}
            <div className="flex items-center gap-2 order-2 xs:order-none justify-end xs:justify-start">
              {/* Search Button */}
              {input && (
                <button
                  onClick={() => handleRecommendation(input)}
                  disabled={loading}
                  className="flex-1 xs:flex-none xs:mx-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 active:scale-95 rounded-lg sm:rounded-xl px-4 sm:px-6 py-2.5 sm:py-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-purple-500/50 min-w-[100px] xs:min-w-0"
                >
                  {loading ? (
                    <BiLoaderAlt className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                  ) : (
                    <>
                      <img src={ai} className='w-4 h-4 sm:w-5 sm:h-5' alt="Search" />
                      <span className="text-xs sm:text-sm font-medium">Search</span>
                    </>
                  )}
                </button>
              )}

              {/* Voice Button - Larger touch target */}
              <button
                onClick={handleSearch}
                disabled={listening || loading}
                className={`${!input ? 'xs:mr-3' : ''} rounded-lg sm:rounded-xl w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center transition-all duration-300 shadow-lg flex-shrink-0 ${listening
                    ? 'bg-red-500 animate-pulse shadow-red-500/50'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:scale-110 active:scale-95 shadow-purple-500/30'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                title={listening ? "Listening..." : "Voice Search"}
              >
                <RiMicAiFill className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </button>
            </div>
          </div>

          {/* Listening Indicator - Compact on mobile */}
          {listening && (
            <div className="mt-3 sm:mt-4 flex items-center justify-center gap-2 sm:gap-3 text-purple-400 animate-fade-in">
              <div className="flex gap-0.5 sm:gap-1">
                <div className="w-0.5 sm:w-1 h-2 sm:h-3 bg-purple-400 rounded-full animate-pulse"></div>
                <div className="w-0.5 sm:w-1 h-3 sm:h-5 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-0.5 sm:w-1 h-2.5 sm:h-4 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-0.5 sm:w-1 h-3 sm:h-5 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                <div className="w-0.5 sm:w-1 h-2 sm:h-3 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
              <span className="text-xs sm:text-sm font-semibold">Listening to your voice...</span>
            </div>
          )}
        </div>
      </div>

      {/* Loading State - Smaller on mobile */}
      {loading && !listening && (
        <div className="mt-10 sm:mt-20 flex flex-col items-center gap-3 sm:gap-4 animate-fade-in relative z-10">
          <div className="relative">
            <BiLoaderAlt className="w-12 h-12 sm:w-16 sm:h-16 text-purple-400 animate-spin" />
            <div className="absolute inset-0 blur-xl bg-purple-500/30 animate-pulse"></div>
          </div>
          <p className="text-gray-300 text-base sm:text-lg font-medium px-4 text-center">Finding the best courses for you...</p>
          <div className="flex gap-1.5 sm:gap-2">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full animate-bounce"></div>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      )}

      {/* Recommendations - Single column on mobile */}
      {!loading && recommendations.length > 0 && (
        <div className="w-full max-w-7xl mt-8 sm:mt-16 px-2 sm:px-4 relative z-10 animate-fade-in">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-10">
            <div className="relative">
              <img src={ai1} className="w-10 h-10 sm:w-14 sm:h-14 p-2 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg" alt="AI Results" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 blur-md opacity-50"></div>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
              AI Recommendations
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {recommendations.map((course, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm border border-gray-700 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 hover:border-purple-500/50 active:scale-[0.98] sm:hover:scale-105 transition-all duration-300 cursor-pointer relative"
                onClick={() => navigate(`/viewcourse/${course._id}`)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <span className="text-xs font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-purple-300 rounded-full border border-purple-500/30 backdrop-blur-sm">
                    {course.category}
                  </span>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                </div>

                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300 line-clamp-2">
                  {course.title}
                </h3>

                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 group-hover:text-purple-300 transition-colors">
                  <span className="hidden xs:inline">Click to explore course</span>
                  <span className="xs:hidden">Tap to explore</span>
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/5 group-hover:to-pink-600/5 transition-all duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State - Compact on mobile */}
      {!loading && !listening && recommendations.length === 0 && input === '' && (
        <div className="mt-10 sm:mt-20 text-center relative z-10 animate-fade-in max-w-md px-4">
          <div className="relative inline-block mb-4 sm:mb-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl sm:rounded-3xl flex items-center justify-center border border-gray-700 shadow-xl">
              <FaSearch className="w-8 h-8 sm:w-10 sm:h-10 text-gray-500" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-2xl sm:rounded-3xl blur-xl"></div>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-300 mb-2 sm:mb-3">Start Your Learning Journey</h3>
          <p className="text-gray-500 mb-4 sm:mb-6 text-sm sm:text-base">Type what you want to learn or use voice search to get AI-powered course recommendations</p>
          <div className="flex items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-400">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <FaSearch className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Text Search</span>
            </div>
            <span>or</span>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <RiMicAiFill className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Voice Search</span>
            </div>
          </div>
        </div>
      )}

      {/* No Results State - Compact on mobile */}
      {!loading && !listening && recommendations.length === 0 && input !== '' && (
        <div className="mt-10 sm:mt-20 text-center relative z-10 animate-fade-in max-w-md px-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 border border-gray-700">
            <FaSearch className="w-6 h-6 sm:w-8 sm:h-8 text-gray-600" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-300 mb-2">No Courses Found</h3>
          <button
            onClick={() => setInput('')}
            className="text-purple-400 hover:text-purple-300 text-xs sm:text-sm font-medium underline transition-colors"
          >
            Clear search and try again
          </button>
        </div>
      )}
    </div>
  );
}

export default SearchWithAi;