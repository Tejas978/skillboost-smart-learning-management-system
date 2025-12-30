import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Mail, Lock, ArrowLeft, Check, Eye, EyeOff } from 'lucide-react';
import { serverUrl } from '../App';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newpassword, setNewPassword] = useState('');
  const [conPassword, setConpassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleStep1 = async (e) => {
    if (e) e.preventDefault();
    setErrors({});
    
    if (!email) {
      setErrors({ email: 'Email is required' });
      return;
    }
    
    if (!validateEmail(email)) {
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }

    setLoading(true);
    try {
      const result = await axios.post(`${serverUrl}/api/auth/sendotp`, { email }, { withCredentials: true });
      console.log(result);
      setStep(2);
      toast.success(result.data.message);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const handleStep2 = async (e) => {
    if (e) e.preventDefault();
    setErrors({});
    
    if (!otp) {
      setErrors({ otp: 'OTP is required' });
      return;
    }
    
    if (otp.length !== 4) {
      setErrors({ otp: 'OTP must be 4 digits' });
      return;
    }

    setLoading(true);
    try {
      const result = await axios.post(`${serverUrl}/api/auth/verifyotp`, { email, otp }, { withCredentials: true });
      console.log(result);
      toast.success(result.data.message);
      setLoading(false);
      setStep(3);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const handleStep3 = async (e) => {
    if (e) e.preventDefault();
    setErrors({});
    
    if (!newpassword) {
      setErrors({ newPassword: 'Password is required' });
      return;
    }
    
    if (!validatePassword(newpassword)) {
      setErrors({ newPassword: 'Password must be at least 8 characters' });
      return;
    }
    
    if (newpassword !== conPassword) {
      setErrors({ conPassword: 'Passwords do not match' });
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const result = await axios.post(`${serverUrl}/api/auth/resetpassword`, { email, password: newpassword }, { withCredentials: true });
      console.log(result);
      toast.success(result.data.message);
      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    try {
      const result = await axios.post(`${serverUrl}/api/auth/sendotp`, { email }, { withCredentials: true });
      toast.success('OTP resent successfully!');
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Failed to resend OTP');
      setLoading(false);
    }
  };

  const handleKeyPress = (e, handler) => {
    if (e.key === 'Enter') {
      handler(e);
    }
  };

  const ProgressBar = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((num) => (
        <React.Fragment key={num}>
          <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-all duration-300 ${
            step >= num 
              ? 'bg-black text-white scale-110' 
              : 'bg-gray-200 text-gray-400'
          }`}>
            {step > num ? <Check size={20} /> : num}
          </div>
          {num < 3 && (
            <div className={`w-16 h-1 mx-2 transition-all duration-300 ${
              step > num ? 'bg-black' : 'bg-gray-200'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const BackButton = () => (
    <button
      onClick={() => navigate("/login")}
      className="flex items-center justify-center text-gray-600 hover:text-black transition-colors duration-200 text-sm font-medium group cursor-pointer"
    >
      <ArrowLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform duration-200" />
      Back to Login
    </button>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-8">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full transform transition-all duration-300 hover:shadow-3xl">
        <ProgressBar />

        {step === 1 && (
          <div className="animate-fadeIn">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Mail size={28} className="text-black" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Forgot Password?
              </h2>
              <p className="text-gray-500 text-sm">
                Enter your email and we'll send you a code
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="you@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, handleStep1)}
                  value={email}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <button
                onClick={handleStep1}
                disabled={loading}
                className="w-full bg-black hover:bg-gray-800 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : (
                  'Send Verification Code'
                )}
              </button>
            </div>

            <div className="mt-6 text-center">
              <BackButton />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fadeIn">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Lock size={28} className="text-black" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Enter Verification Code
              </h2>
              <p className="text-gray-500 text-sm">
                We sent a 4-digit code to <span className="font-semibold text-gray-700">{email}</span>
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Verification Code
                </label>
                <input
                  type="text"
                  maxLength="4"
                  className={`w-full px-4 py-3 border rounded-lg shadow-sm text-center text-2xl font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200 ${
                    errors.otp ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="- - - -"
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  onKeyPress={(e) => handleKeyPress(e, handleStep2)}
                  value={otp}
                />
                {errors.otp && (
                  <p className="text-red-500 text-xs mt-1">{errors.otp}</p>
                )}
              </div>

              <button
                onClick={handleStep2}
                disabled={loading}
                className="w-full bg-black hover:bg-gray-800 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : (
                  'Verify Code'
                )}
              </button>

              <button
                type="button"
                className="w-full text-sm text-gray-600 hover:text-black transition-colors duration-200 font-medium"
                onClick={handleResendOTP}
                disabled={loading}
              >
                Didn't receive the code? <span className="underline">Resend</span>
              </button>
            </div>

            <div className="mt-6 text-center">
              <BackButton />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fadeIn">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Lock size={28} className="text-black" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Reset Password
              </h2>
              <p className="text-gray-500 text-sm">
                Create a strong password for your account
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className={`w-full px-4 py-3 border rounded-lg shadow-sm pr-12 focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200 ${
                      errors.newPassword ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter new password"
                    onChange={(e) => setNewPassword(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, handleStep3)}
                    value={newpassword}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.newPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    className={`w-full px-4 py-3 border rounded-lg shadow-sm pr-12 focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200 ${
                      errors.conPassword ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Re-enter new password"
                    onChange={(e) => setConpassword(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, handleStep3)}
                    value={conPassword}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.conPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.conPassword}</p>
                )}
              </div>

              <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-600">
                <p className="font-semibold mb-1">Password must contain:</p>
                <ul className="space-y-1">
                  <li className={newpassword.length >= 8 ? 'text-green-600' : ''}>
                    • At least 8 characters
                  </li>
                </ul>
              </div>

              <button
                onClick={handleStep3}
                disabled={loading}
                className="w-full bg-black hover:bg-gray-800 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : (
                  'Reset Password'
                )}
              </button>
            </div>

            <div className="mt-6 text-center">
              <BackButton />
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}