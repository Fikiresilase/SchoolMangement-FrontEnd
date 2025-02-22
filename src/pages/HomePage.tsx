import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authSlice";
import { RootState, AppDispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  const {  loading, error } = useSelector((state: RootState) => state.auth);
  
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  
  const handleLearnMoreClick = () => setShowLogin(true);

  const handleLogin =  (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    dispatch(login({ email, password }) as any);
   
    
    
    
  };
const user = JSON.parse(localStorage.getItem('user') as any)
  useEffect(() => {
    
    if (user) {
      
      switch (user.role) {
        case "teacher":
          navigate("/teacher-page");
          break;
        case "registrar":
          navigate("/registrar-page");
          break;
        case "admin":
          navigate("/admin-page");
          break;
        default:
          navigate("/");
          break;
      }
    }
  }, [user, navigate]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50">
      <section className="relative w-full h-screen flex flex-col items-center justify-center text-center bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-800 text-white px-6 md:px-12 lg:px-24">
        <div className="relative z-10 max-w-4xl mx-auto animate-fadeIn">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-wide">
            Welcome to Our <span className="text-slate-200">School Management System</span>
          </h1>
          <p className="text-lg md:text-xl mt-6 opacity-90">
            A seamless way to manage students, teachers, and administration all in one platform.
          </p>
          <button
            onClick={handleLearnMoreClick}
            className="mt-8 px-8 py-4 text-lg font-semibold bg-blue-400 text-white rounded-full shadow-lg hover:bg-blue-300 transition duration-300"
          >
            Get Started
          </button>
        </div>
      </section>

      {showLogin && (
        <section className="flex flex-col items-center w-full max-w-md p-8 mt-10 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Login to Your Account</h2>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <form onSubmit={handleLogin} className="w-full space-y-5">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-blue-500 transition"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-4 py-3 mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:opacity-90 transition duration-300"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-4 text-gray-600 text-sm">
            Don’t have an account?{" "}
            <a href="#" className="text-blue-600 font-medium hover:underline">
              Register here
            </a>
          </p>
        </section>
      )}

      <footer className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-800 text-white text-center py-6 mt-10">
        <p className="text-sm">&copy; {new Date().getFullYear()} School Management System. All rights reserved.</p>
        <div className="mt-4">
          <a href="#" className="text-blue-200 hover:text-blue-100 px-4">Privacy Policy</a>
          <a href="#" className="text-blue-200 hover:text-blue-100 px-4">Terms of Service</a>
          <a href="#" className="text-blue-200 hover:text-blue-100 px-4">Contact Us</a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
