import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import {
  Menu,
  X,
  ChevronDown,
  User,
  BookOpen,
  LayoutDashboard,
  LogOut,
  Home
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";

function Nav() {
  const [showHam, setShowHam] = useState(false);
  const [showPro, setShowPro] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  const handleNavigate = (path) => {
    navigate(path);
    setShowHam(false);
    setShowPro(false);
  };

  const handleLogout = async () => {
    try {
      await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      toast.success("Logged out successfully");
      navigate("/");
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <>
      {/* 🌑 Floating Glass Navbar */}
      <div className="fixed top-2 sm:top-4 left-0 right-0 z-50 flex justify-center px-2 sm:px-4">
        <nav className="w-full max-w-7xl bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl shadow-2xl">
          <div className="px-3 sm:px-6">
            <div className="flex items-center justify-between h-14 sm:h-16">

              {/* LOGO */}
              <img
                src={logo}
                className="h-10 sm:h-12 md:h-14 lg:h-20 w-auto cursor-pointer hover:scale-105 transition-transform"
                onClick={() => handleNavigate("/")}
                alt="SkillBoost Logo"
              />

              {/* DESKTOP MENU */}
              <div className="hidden md:flex items-center gap-4">

                {/* HOME (only when logged in) */}
                {userData && (
                  <button
                    onClick={() => handleNavigate("/")}
                    className="flex items-center gap-2 cursor-pointer
                               text-gray-300 hover:text-white
                               px-4 py-2 rounded-lg
                               border border-zinc-700
                               hover:border-zinc-500
                               hover:bg-zinc-800
                               transition-all duration-200"
                  >
                    <Home size={18} />
                    Home
                  </button>
                )}

                {/* DASHBOARD (educator only) */}
                {userData?.role === "educator" && (
                  <button
                    onClick={() => handleNavigate("/dashboard")}
                    className="flex items-center gap-2 cursor-pointer
                               text-gray-300 hover:text-white
                               px-4 py-2 rounded-lg
                               border border-zinc-700
                               hover:border-zinc-500
                               hover:bg-zinc-800
                               transition-all duration-200"
                  >
                    <LayoutDashboard size={18} />
                    Dashboard
                  </button>
                )}

                {/* AUTH */}
                {!userData ? (
                  <>
                    <button
                      onClick={() => handleNavigate("/login")}
                      className="px-4 py-2 rounded-lg text-gray-300 hover:text-white border border-zinc-700 hover:border-zinc-500 hover:bg-zinc-800 transition-all duration-200 cursor-pointer"
                    >
                      Login
                    </button>

                    <button
                      onClick={() => handleNavigate("/signup")}
                      className="bg-white text-black px-5 py-2 rounded-xl font-bold hover:bg-gray-100 cursor-pointer"
                    >
                      Get Started
                    </button>
                  </>
                ) : (
                  <div className="relative">
                    {/* AVATAR */}
                    <div
                      onClick={() => setShowPro((p) => !p)}
                      className="flex items-center gap-2 cursor-pointer p-1 rounded-full hover:bg-zinc-800"
                    >
                      <div className="w-12 h-12 rounded-full overflow-hidden border border-zinc-600">
                        {userData.photoUrl ? (
                          <img
                            src={userData.photoUrl}
                            className="w-full h-full object-cover"
                            alt="Profile"
                          />
                        ) : (
                          <div className="w-full h-full bg-zinc-800 text-white flex items-center justify-center font-bold">
                            {userData.name?.[0]?.toUpperCase()}
                          </div>
                        )}
                      </div>
                      <ChevronDown
                        size={14}
                        className={`text-gray-400 transition-transform ${showPro ? "rotate-180" : ""
                          }`}
                      />
                    </div>

                    {/* DROPDOWN */}
                    {showPro && (
                      <div className="absolute right-0 mt-3 w-56 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl">
                        <button
                          onClick={() => handleNavigate("/profile")}
                          className="w-full px-4 py-3 flex items-center gap-3 text-gray-300 hover:bg-zinc-800 hover:text-white"
                        >
                          <User size={16} /> My Profile
                        </button>
                        <button
                          onClick={() => handleNavigate("/enrolledcourses")}
                          className="w-full px-4 py-3 flex items-center gap-3 text-gray-300 hover:bg-zinc-800 hover:text-white"
                        >
                          <BookOpen size={16} /> My Courses
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full px-4 py-3 flex items-center gap-3 text-red-400 hover:bg-red-500/10"
                        >
                          <LogOut size={16} /> Logout
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* MOBILE MENU ICON */}
              <button
                onClick={() => setShowHam(true)}
                className="md:hidden p-2 rounded-lg hover:bg-zinc-800 cursor-pointer"
              >
                <Menu className="text-white w-6 h-6" />
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* 📱 MOBILE DRAWER */}
      <div className={`fixed inset-0 z-[60] ${showHam ? "visible" : "invisible"}`}>
        <div
          className={`absolute inset-0 bg-black/60 ${showHam ? "opacity-100" : "opacity-0"}`}
          onClick={() => setShowHam(false)}
        />

        <div
          className={`absolute right-4 top-4 bottom-4 w-[85%] max-w-sm bg-zinc-900 rounded-3xl p-6 transition-transform ${showHam ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="flex justify-between items-center mb-6">
            <span className="text-xl font-bold text-white">Menu</span>
            <X
              onClick={() => setShowHam(false)}
              className="text-gray-300 cursor-pointer"
            />
          </div>

          {userData && (
            <>
              <button
                onClick={() => handleNavigate("/")}
                className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-zinc-800 rounded-xl"
              >
                <Home size={18} /> Home
              </button>
              <button
                onClick={() => handleNavigate("/profile")}
                className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-zinc-800 rounded-xl"
              >
                <User size={18} /> My Profile
              </button>
              <button
                onClick={() => handleNavigate("/enrolledcourses")}
                className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-zinc-800 rounded-xl"
              >
                <BookOpen size={18} /> My Courses
              </button>
            </>
          )}

          <div className="mt-auto pt-4 border-t border-zinc-800">
            {!userData ? (
              <button
                onClick={() => handleNavigate("/login")}
                className="w-full bg-white text-black py-3 rounded-xl font-bold"
              >
                Login / Get Started
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="w-full text-red-400 py-3 hover:bg-red-500/10 rounded-xl"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Nav;
