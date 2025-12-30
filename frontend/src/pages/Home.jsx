import React from 'react';
import { motion } from 'framer-motion';
import home from "../assets/herohome2.jpg";
import Nav from '../components/Nav';
import Logos from '../components/Logos';
import Cardspage from '../components/Cardspage';
import ExploreCourses from '../components/ExploreCourses';
import About from '../components/About';
import ai from '../assets/ai.png';
import ai1 from '../assets/SearchAi.png';
import ReviewPage from '../components/ReviewPage';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { Rocket } from "lucide-react";

// Animation Variants for cleaner code
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const imageZoom = {
  hidden: { scale: 1.1, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1, 
    transition: { duration: 1.5, ease: "easeOut" } 
  }
};

function Home() {
  const navigate = useNavigate();

  return (
    <div className='w-full overflow-hidden bg-gradient-to-b from-gray-50 to-white'>

      {/* Hero Section */}
      <div className='relative w-full min-h-[100svh] lg:h-screen flex flex-col'>
        <Nav />

        {/* Image with overlay gradient and Zoom Effect */}
        <div className='relative flex-1 w-full overflow-hidden'>
          <div className='absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 z-10'></div>
          <motion.img
            src={home}
            variants={imageZoom}
            initial="hidden"
            animate="visible"
            className='absolute inset-0 w-full h-full object-cover object-center brightness-120'
            alt="Learning background"
          />

          {/* Hero Content */}
          <div className='relative z-20 h-full flex flex-col items-center justify-center px-4 sm:px-6 text-center py-20 sm:py-0'>
            <motion.div 
              className='max-w-5xl mx-auto space-y-2 sm:space-y-6'
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >

              {/* Badge */}
              <motion.div variants={fadeInUp} className='flex justify-center lg:mb-8 lg:mt-20 mb-2 sm:mb-4'>
                <div className='inline-flex items-center gap-3 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white text-xs sm:text-sm font-medium'>
                  <span className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></span>
                  Transform Your Future Today
                </div>
              </motion.div>

              {/* Main Heading */}
              <motion.h1 variants={fadeInUp} className="text-white font-bold leading-tight lg:mt-10">
                <span className="block text-2xl sm:text-4xl md:text-5xl lg:text-6xl mb-1 sm:mb-2">
                  Grow Your Skills to
                </span>
                <span className="block text-2xl sm:text-4xl md:text-5xl lg:text-7xl bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                  Advance Your Career
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p variants={fadeInUp} className='text-gray-200 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto font-light px-4'>
                Join thousands of learners mastering in-demand skills with expert-led courses
              </motion.p>

              {/* CTA Buttons */}
              <motion.div variants={fadeInUp} className='flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-6 sm:pt-8 px-4 sm:px-0'>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/allcourses")}
                  className='group relative px-6 py-3 sm:px-8 sm:py-4 bg-white cursor-pointer text-gray-900 rounded-xl text-sm sm:text-base md:text-lg font-semibold overflow-hidden shadow-lg shadow-white/10 flex items-center gap-2 sm:gap-3 justify-center'
                >
                  <span className='relative z-10'>View All Courses</span>
                  <Rocket
                    className="w-4 h-4 sm:w-5 sm:h-5 lg:w-5 lg:h-5 relative z-10 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-0.5 group-hover:rotate-12"
                  />
                  <div className='absolute inset-0 bg-gradient-to-br from-slate-200 via-slate-100 to-white opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out'></div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/searchwithai")}
                  className='group relative px-6 py-3 sm:px-8 sm:py-4 cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl text-sm sm:text-base md:text-lg font-semibold overflow-hidden shadow-lg shadow-violet-500/30 flex items-center gap-2 sm:gap-3 justify-center border-2 border-white/20'
                >
                  <span className='relative z-10'>Search with AI</span>
                  <img
                    src={ai}
                    className='w-5 h-5 sm:w-6 sm:h-6 rounded-full hidden lg:block relative z-10 group-hover:rotate-12 transition-transform'
                    alt="AI"
                  />
                  <img
                    src={ai1}
                    className='w-5 h-5 sm:w-6 sm:h-6 rounded-full lg:hidden relative z-10 group-hover:rotate-12 transition-transform'
                    alt="AI"
                  />
                  <div className='absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                </motion.button>
              </motion.div>

              {/* Stats or Social Proof - Staggered entrance */}
              <motion.div 
                variants={fadeInUp}
                className='flex flex-wrap items-center justify-center gap-6 sm:gap-8 pt-8 sm:pt-12 text-white px-4'
              >
                <div className='text-center'>
                  <div className='text-xl sm:text-2xl md:text-3xl font-bold'>50K+</div>
                  <div className='text-xs sm:text-sm text-gray-300'>Active Learners</div>
                </div>
                <div className='w-px h-10 sm:h-12 bg-white/20'></div>
                <div className='text-center'>
                  <div className='text-xl sm:text-2xl md:text-3xl font-bold'>500+</div>
                  <div className='text-xs sm:text-sm text-gray-300'>Expert Courses</div>
                </div>
                <div className='w-px h-10 sm:h-12 bg-white/20'></div>
                <div className='text-center'>
                  <div className='text-xl sm:text-2xl md:text-3xl font-bold'>4.9/5</div>
                  <div className='text-xs sm:text-sm text-gray-300'>Average Rating</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content Sections with Scroll Reveal Animations */}
      <div className="space-y-12 sm:space-y-16 lg:space-y-16 py-10 sm:py-12 lg:py-16">
        
        {/* Helper function to wrap sections with scroll animation */}
        <SectionWrapper>
          <Logos />
        </SectionWrapper>

        <SectionWrapper>
          <ExploreCourses />
        </SectionWrapper>

        <SectionWrapper>
          <Cardspage />
        </SectionWrapper>

        <SectionWrapper>
          <About />
        </SectionWrapper>

        <SectionWrapper>
          <ReviewPage />
        </SectionWrapper>
      </div>

      <Footer />
    </div>
  )
}

// Internal reusable wrapper for scroll animations
function SectionWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }} // Triggers when 100px into view, only once
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default Home;