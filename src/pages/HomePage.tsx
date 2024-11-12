import React, { useState } from "react";

const HomePage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLearnMoreClick = () => {
    document.getElementById("login-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Both fields are required!");
    } else {
      setError("");
   
      alert("Logging in...");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <section className="w-full bg-blue-600 text-white py-16 px-8 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto text-center animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Our School Management System</h1>
          <p className="text-lg md:text-xl mb-6">
            Streamline school administration with an easy-to-use platform for teachers, students, and parents.
          </p>
          <button
            onClick={handleLearnMoreClick}
            className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-200 transition duration-200"
          >
            Learn More
          </button>
        </div>
      </section>

 
      {error && (
        <div className="mt-4 px-4 py-2 text-sm bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}


      <section
        id="login-form"
        className="flex flex-col items-center w-full max-w-md p-8 mt-10 bg-white rounded-lg shadow-lg transition-opacity duration-300 ease-in-out"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Login to Your Account</h2>
        <form onSubmit={handleLogin} className="w-full space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-blue-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-gray-600 text-sm">
          Don’t have an account? <a href="#" className="text-blue-600 hover:underline">Register here</a>
        </p>
      </section>
    </div>
  );
};

export default HomePage;
