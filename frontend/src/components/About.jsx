import React from 'react';
import { Layout, CheckCircle2 } from 'lucide-react';
import { TfiLayoutLineSolid } from "react-icons/tfi";
import aboutVideo from "./video.mp4"

function About() {
  const features = [
    { text: "Simplified Learning", delay: "0s" },
    { text: "Expert Trainers", delay: "0.1s" },
    { text: "Big Experience", delay: "0.2s" },
    { text: "Lifetime Access", delay: "0.3s" }
  ];

  return (
    <div className="w-full px-4 md:px-8 lg:px-16 py-10 sm:pt-12 sm:pb-6 lg:pb-4">

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fade-in-left {
          animation: fadeInLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fade-in-right {
          animation: fadeInRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-scale-in {
          animation: scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
      <div className='max-w-7xl mx-auto'>
        <div className='grid lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
          {/* Video Section with Enhanced Border */}
          <div className='relative group animate-fade-in-left'>
            {/* Outer glow - primary */}
            <div className='absolute -inset-1 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-700 group-hover:blur-2xl'></div>

            {/* Outer glow - secondary (animated) */}
            <div className='absolute -inset-2 bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 rounded-3xl opacity-0 group-hover:opacity-30 transition-all duration-700 blur-2xl animate-pulse'></div>

            {/* Main border container with gradient */}
            <div className="relative rounded-3xl p-[2px] bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 group-hover:from-gray-400 group-hover:via-gray-500 group-hover:to-gray-600 transition-all duration-500 shadow-2xl group-hover:shadow-3xl">

              {/* Inner white container for contrast */}
              <div className="relative rounded-3xl bg-white p-[1px]">

                <div className="relative overflow-hidden rounded-3xl">
                  {/* Video */}
                  <video
                    className="w-full h-[400px] lg:h-[500px] object-cover"
                    src={aboutVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                  />
                  {/* Shimmer effect overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{
                      background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.2) 50%, transparent 70%)',
                      backgroundSize: '200% 200%',
                      animation: 'shimmer 2s infinite',
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  {/* Inner shadow for depth */}
                  {/* <div className="pointer-events-none absolute inset-0 rounded-3xl" style={{
                    boxShadow: 'inset 0 2px 12px rgba(0,0,0,0.08)'
                  }} /> */}
                  {/* Corner accents - top left */}
                  <div className="absolute top-0 left-0 w-20 h-20 pointer-events-none">
                    <div className="absolute top-4 left-4 w-10 h-0.5 bg-gradient-to-r from-white/70 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    <div className="absolute top-4 left-4 w-0.5 h-10 bg-gradient-to-b from-white/70 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  </div>
                  {/* Corner accents - bottom right */}
                  <div className="absolute bottom-0 right-0 w-20 h-20 pointer-events-none">
                    <div className="absolute bottom-4 right-4 w-10 h-0.5 bg-gradient-to-l from-white/70 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    <div className="absolute bottom-4 right-4 w-0.5 h-10 bg-gradient-to-t from-white/70 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating particles effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-gray-400 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
              <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-gray-500 rounded-full animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
              <div className="absolute bottom-1/3 left-2/3 w-1 h-1 bg-gray-400 rounded-full animate-ping" style={{ animationDuration: '5s', animationDelay: '2s' }}></div>
            </div>
          </div>

          {/* Content Section */}
          <div className='space-y-6'>
            <div className='inline-flex items-center gap-3 px-5 py-2.5 bg-gray-900 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-in'>
              <TfiLayoutLineSolid className='w-5 h-5 text-gray-300' />
              <Layout className='w-5 h-5 text-gray-300' />
              <span className='text-sm font-semibold text-gray-300 uppercase tracking-wider'>About Us</span>
            </div>

            <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight animate-fade-in-right' style={{ animationDelay: '0.1s' }}>
              Maximize Your{' '}
              <span className='relative inline-block'>
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-900'>
                  Learning Growth
                </span>
              </span>
            </h2>

            <p className='text-lg text-gray-600 leading-relaxed animate-fade-in-right' style={{ animationDelay: '0.2s' }}>
              We provide a modern Learning Management System to simplify online education, track progress, and enhance student-instructor collaboration efficiently.
            </p>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 pt-4'>
              {features.map((feature, index) => (
                <div
                  key={index}
                  className='group flex items-center gap-3 p-5 bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-200/40 hover:shadow-2xl hover:shadow-gray-300/50 hover:-translate-y-1 hover:border-gray-200 transition-all duration-500 animate-fade-in-up cursor-pointer'
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  <div className='relative'>
                    <div className='w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6'>
                      <CheckCircle2 className='w-6 h-6 text-green-500 transition-transform duration-500 group-hover:scale-110' strokeWidth={2.5} />
                    </div>
                    <div className='absolute inset-0 rounded-xl bg-gradient-to-br from-green-400 to-green-600 opacity-0 group-hover:opacity-20 scale-100 group-hover:scale-125 transition-all duration-700 blur-md'></div>
                  </div>
                  <span className='font-semibold text-gray-800 group-hover:text-gray-900 transition-colors duration-300'>{feature.text}</span>
                  <div className='absolute bottom-0 left-0 w-0 group-hover:w-full h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-b-2xl transition-all duration-500'></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default About;