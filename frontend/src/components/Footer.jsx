import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

const Footer = () => {
  let navigate = useNavigate();
  
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-10">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Skill Boost Logo" className="h-12 w-12 rounded-lg object-cover " />
              <h2 className="text-2xl font-bold text-white">Skill Boost</h2>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Empowering learners worldwide with cutting-edge courses and expert instruction. Boost your skills, advance your career.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
                <FaFacebookF className="text-gray-300" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
                <FaTwitter className="text-gray-300" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
                <FaLinkedinIn className="text-gray-300" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
                <FaInstagram className="text-gray-300" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div >
            <h3 className="text-white font-semibold text-lg mb-4 relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gray-600"></span>
            </h3>
            <ul className="space-y-3 ">
              <li>
                <button 
                  onClick={() => navigate("/")} 
                  className="text-gray-400 hover:text-white cursor-pointer hover:translate-x-1 transition-all duration-300 inline-block"
                >
                  → Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate("/allcourses")} 
                  className="text-gray-400 hover:text-white cursor-pointer hover:translate-x-1 transition-all duration-300 inline-block"
                >
                  → All Courses
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate("/login")} 
                  className="text-gray-400 hover:text-white cursor-pointer hover:translate-x-1 transition-all duration-300 inline-block"
                >
                  → Login
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate("/profile")} 
                  className="text-gray-400 hover:text-white cursor-pointer hover:translate-x-1 transition-all duration-300 inline-block"
                >
                  → My Profile
                </button>
              </li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div onClick={() => navigate("/allcourses")}  >
            <h3 className="text-white font-semibold text-lg mb-4 relative inline-block">
              Popular Categories
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gray-600"></span>
            </h3>
            <ul className="space-y-3">
              <li className="text-gray-400 hover:text-white cursor-pointer hover:translate-x-1 transition-all duration-300">
                → Web Development
              </li>
              <li className="text-gray-400 hover:text-white cursor-pointer hover:translate-x-1 transition-all duration-300">
                → AI & Machine Learning
              </li>
              <li className="text-gray-400 hover:text-white cursor-pointer hover:translate-x-1 transition-all duration-300">
                → Data Science
              </li>
              <li className="text-gray-400 hover:text-white cursor-pointer hover:translate-x-1 transition-all duration-300">
                → UI/UX Design
              </li>
              <li className="text-gray-400 hover:text-white cursor-pointer hover:translate-x-1 transition-all duration-300">
                → Mobile Development
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 relative inline-block">
              Get In Touch
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gray-600"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <MdEmail className="text-xl mt-1 flex-shrink-0" />
                <span className="text-sm">contact@skillboost.com</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <MdPhone className="text-xl mt-1 flex-shrink-0" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <MdLocationOn className="text-xl mt-1 flex-shrink-0" />
                <span className="text-sm">123 Learning Street, Education City, EC 12345</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-800"></div>

        {/* Bottom Bar */}
        <div className="py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Skill Boost. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;