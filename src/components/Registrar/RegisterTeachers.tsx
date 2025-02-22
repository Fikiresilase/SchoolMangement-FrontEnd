import { ChangeEvent, FormEvent, useState } from "react";
import { registerUser } from "../../services/registration-services";
import axios from "axios";

const RegisterTeachers = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "teacher",
  });

  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage(null);

    registerUser(formData)
      .then(() => {
        setMessage({ text: "Teacher registered successfully!", type: "success" });
        setFormData({ name: "", email: "", password: "", role: "teacher" });
      })
      .catch((error: unknown) => {
        if (axios.isAxiosError(error)) {
          setMessage({
            text: error.response?.data?.message || "Failed to register teacher. Please try again.",
            type: "error",
          });
        } else {
          setMessage({
            text: "An unexpected error occurred. Please try again later.",
            type: "error",
          });
        }
      })
      .finally(() => setIsLoading(false));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-8 w-full max-w-md space-y-6 border border-gray-100 animate-fade-in"
      >
        <header className="mb-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent text-center">
            Teacher Registration
          </h2>
          <p className="text-sm text-gray-500 text-center mt-2">Create a new teacher account</p>
        </header>

        {message && (
          <div
            className={`p-4 rounded-lg text-center text-sm font-medium ${
              message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
            type="text"
            placeholder="Enter full name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
            type="email"
            placeholder="teacher@example.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
            type="password"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 text-white rounded-lg font-semibold transition-all duration-300 ${
            isLoading
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg transform hover:-translate-y-1"
          }`}
        >
          {isLoading ? "Submitting..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegisterTeachers;