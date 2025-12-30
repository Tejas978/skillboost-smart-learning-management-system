import React from 'react'
import {
  ArrowRight,
  Monitor,
  Layout,
  Smartphone,
  Shield,
  BrainCircuit,
  Database,
  BarChart2,
  Sparkles
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function ExploreCourses() {
  const navigate = useNavigate()

  const courses = [
    { icon: Monitor, title: "Web Development", gradient: "from-purple-500 to-pink-500", bg: "bg-purple-50", text: "text-purple-600" },
    { icon: Layout, title: "UI/UX Designing", gradient: "from-green-400 to-emerald-500", bg: "bg-green-50", text: "text-emerald-600" },
    { icon: Smartphone, title: "App Development", gradient: "from-pink-500 to-rose-500", bg: "bg-pink-50", text: "text-rose-600" },
    { icon: Shield, title: "Ethical Hacking", gradient: "from-indigo-400 to-purple-500", bg: "bg-indigo-50", text: "text-indigo-600" },
    { icon: BrainCircuit, title: "AI / ML", gradient: "from-emerald-400 to-teal-500", bg: "bg-teal-50", text: "text-teal-600" },
    { icon: Database, title: "Data Science", gradient: "from-orange-400 to-red-500", bg: "bg-orange-50", text: "text-orange-600" },
    { icon: BarChart2, title: "Data Analytics", gradient: "from-blue-400 to-indigo-500", bg: "bg-blue-50", text: "text-blue-600" },
    { icon: Sparkles, title: "AI Tools", gradient: "from-violet-400 to-fuchsia-500", bg: "bg-fuchsia-50", text: "text-fuchsia-600" }
  ]

  const topRow = [...courses.slice(0, 4), ...courses.slice(0, 4), ...courses.slice(0, 4)]
  const bottomRow = [...courses.slice(4), ...courses.slice(4), ...courses.slice(4)]

  const CourseCard = ({ course }) => (
    <div
      onClick={() => navigate("/allcourses")}
      className="cursor-pointer w-[240px] flex-shrink-0"
    >
      <div className="h-full flex flex-col items-center gap-4 p-6 rounded-3xl bg-white border border-zinc-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
        <div className={`w-16 h-16 ${course.bg} rounded-2xl flex items-center justify-center`}>
          <course.icon className={`w-8 h-8 ${course.text}`} />
        </div>
        <span className="text-sm font-bold text-zinc-700 text-center">
          {course.title}
        </span>
      </div>
    </div>
  )

  return (
    <div className="
  w-full
  overflow-hidden
  px-6
  py-10 sm:py-12 lg:py-8
">


      {/* Animations */}
      <style>{`
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        @keyframes scrollRight {
          0% { transform: translateX(-33.33%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-left {
          animation: scrollLeft 30s linear infinite;
        }
        .animate-scroll-right {
          animation: scrollRight 30s linear infinite;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">

        {/* LEFT CONTENT */}
        <div className="w-full lg:w-1/3 flex flex-col items-start gap-8 text-center lg:text-left animate-fade-in-up">
          <h2 className="text-5xl lg:text-6xl font-extrabold text-zinc-900 leading-tight">
            Explore <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-zinc-800">
              Our Courses
            </span>
          </h2>

          <p className="text-zinc-600 text-lg max-w-md mx-auto lg:mx-0 font-light">
            Discover a wide range of expertly crafted courses designed to help you master new skills and advance your career.
          </p>

          {/* WORKING BUTTON */}
          <button
            type="button"
            onClick={() => navigate("/allcourses")}
            className="px-8 py-4 bg-black cursor-pointer text-white rounded-2xl font-semibold shadow-xl hover:bg-zinc-900 active:scale-95 transition-all flex items-center gap-3 mx-auto lg:mx-0"
          >
            Browse All Courses
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* RIGHT MARQUEE */}
        <div className="w-full lg:w-2/3 overflow-hidden">
          <div className="flex flex-col gap-6">
            <div className="flex gap-6 animate-scroll-left w-max">
              {topRow.map((c, i) => <CourseCard key={`top-${i}`} course={c} />)}
            </div>
            <div className="flex gap-6 animate-scroll-right w-max">
              {bottomRow.map((c, i) => <CourseCard key={`bottom-${i}`} course={c} />)}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
