import React, { useState, memo } from "react";
import { Eye, EyeOff, Mail, Lock, User, Phone, UserPlus, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../utils/Axios";
import { useAuth } from "../context/AuthContext";


const InputField = memo(({
  // eslint-disable-next-line no-unused-vars
  icon: Icon,
  name,
  type = "text",
  placeholder,
  label,
  showToggle = false,
  toggleState,
  onToggle,
  value, 
  onChange, 
}) => (
  <div className="space-y-2">
    <label htmlFor={name} className="block text-sm font-medium text-gray-200">
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        id={name}
        name={name}
        type={showToggle ? (toggleState ? "text" : "password") : type}
        // 
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
        placeholder={placeholder}
        required
        autoComplete={name === 'password' ? 'new-password' : name}
      />
      {showToggle && (
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
          onClick={onToggle}
        >
          {toggleState ? (
            <EyeOff className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
          ) : (
            <Eye className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
          )}
        </button>
      )}
    </div>
  </div>
));

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const { setToken } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // ✅ Ab handleChange mein koi badlav nahi hai
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    if (error) {
      setError("");
    }
  };

  const validateForm = () => {
    const { fullname, username, email, mobile, password, confirmPassword } = formData;
    
    if (!fullname.trim()) return "Full name is required";
    if (!username.trim()) return "Username is required";
    if (username.length < 3) return "Username must be at least 3 characters";
    if (!email.trim()) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(email)) return "Please enter a valid email";
    if (!mobile.trim()) return "Mobile number is required";
    if (!/^[0-9]{10}$/.test(mobile)) return "Please enter a valid 10-digit mobile number";
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    if (password !== confirmPassword) return "Passwords do not match";
    
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const validationError = validateForm();
    if (validationError) {
      setError(`❌ ${validationError}`);
      return;
    }

    setLoading(true);

    try {
      // eslint-disable-next-line no-unused-vars
      const { confirmPassword, ...submitData } = formData;
      
      const res = await API.post("/user/register", submitData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      const data = res.data;
      
      localStorage.setItem("token", data.token)
      // localStorage.setItem("user", JSON.stringify(data.user));
      setToken(data.token);
      setSuccess(true);

      setTimeout(() => {
        setFormData({
          fullname: "",
          username: "",
          email: "",
          mobile: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/manager");
      }, 1500);

    } catch (err) {
      console.error("Registration error:", err);
      
      const errorMessage = err.response?.data?.message || err.message || "Registration failed. Please try again.";
      setError(`❌ ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="relative max-w-md w-full">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto h-16 w-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mb-4 relative shadow-lg">
              <UserPlus className="h-8 w-8 text-white" />
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-700 rounded-full blur-xl opacity-50"></div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-gray-300">Join us today and get started</p>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="mb-6 p-3 bg-red-500/20 border border-red-500/40 rounded-lg animate-pulse">
              <p className="text-red-300 text-sm text-center">{error}</p>
            </div>
          )}
          {success && (
            <div className="mb-6 p-3 bg-green-500/20 border border-green-500/40 rounded-lg animate-bounce">
              <p className="text-green-300 text-sm text-center">
                🎉 Account created successfully! Redirecting...
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <InputField 
              icon={User} 
              name="fullname" 
              type="text" 
              placeholder="Enter your full name" 
              label="Full Name" 
              // ✅ props pass kiye
              value={formData.fullname}
              onChange={handleChange}
            />
            
            <InputField 
              icon={User} 
              name="username" 
              type="text" 
              placeholder="Choose a username" 
              label="Username" 
              // ✅ props pass kiye
              value={formData.username}
              onChange={handleChange}
            />
            
            <InputField 
              icon={Mail} 
              name="email" 
              type="email" 
              placeholder="Enter your email" 
              label="Email" 
              // ✅ props pass kiye
              value={formData.email}
              onChange={handleChange}
            />
            
            <InputField 
              icon={Phone} 
              name="mobile" 
              type="tel" 
              placeholder="Enter mobile number" 
              label="Mobile Number" 
              // ✅ props pass kiye
              value={formData.mobile}
              onChange={handleChange}
            />

            <InputField
              icon={Lock}
              name="password"
              type="password"
              placeholder="Create a password"
              label="Password"
              showToggle={true}
              toggleState={showPassword}
              onToggle={() => setShowPassword(!showPassword)}
              // ✅ props pass kiye
              value={formData.password}
              onChange={handleChange}
            />

            <InputField
              icon={Lock}
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              label="Confirm Password"
              showToggle={true}
              toggleState={showConfirmPassword}
              onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
              // ✅ props pass kiye
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-medium text-white bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-95"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                  Creating Account...
                </>
              ) : (
                <>
                  <UserPlus className="h-5 w-5 mr-2" />
                  Create Account
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-300">
              Already have an account?{" "}
              <Link 
                to="/login" 
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors underline-offset-4 hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>

          <div className="mt-4 p-3 bg-white/5 border border-white/10 rounded-lg">
            <p className="text-xs text-center text-gray-400">
              By creating an account, you agree to our{" "}
              <a href="#" className="text-blue-400 hover:underline">Terms of Service</a> and{" "}
              <a href="#" className="text-blue-400 hover:underline">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
