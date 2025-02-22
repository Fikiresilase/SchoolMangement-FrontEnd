import { useState, ChangeEvent, FormEvent } from "react";
import { registerUser } from "../../services/registration-services";
import axios from "axios";

const RegisterStudents = () => {
  const [formData, setFormData] = useState({
    studentName: "",
    email: "",
    password: "",
    studentSection: "",
    studentGrade: "",
    parentName: "",
    parentEmail: "",
    parentPassword: "",
  });

  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const studentData = { ...formData };

    registerUser(studentData)
      .then(() => {
        setMessage({ text: "Student and parent registered successfully!", type: "success" });
        setFormData({
          studentName: "",
          email: "",
          password: "",
          studentSection: "",
          studentGrade: "",
          parentName: "",
          parentEmail: "",
          parentPassword: "",
        });
      })
      .catch((error: unknown) => {
        if (axios.isAxiosError(error)) {
          setMessage({
            text: error.response?.data?.message || "Failed to register. Please try again.",
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
        className="bg-white shadow-md rounded-xl p-8 w-full max-w-4xl space-y-6 grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray-100 animate-fade-in"
      >
        <header className="col-span-1 md:col-span-2 mb-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent text-center">
            Register Student and Parent
          </h2>
          <p className="text-sm text-gray-500 text-center mt-2">
            Create accounts for students and their parents
          </p>
        </header>

        {message && (
          <div
            className={`col-span-1 md:col-span-2 p-4 rounded-lg text-center text-sm font-medium ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="studentName">
            Student Name
          </label>
          <input
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
            type="text"
            placeholder="Enter student name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
            Student Email
          </label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
            type="email"
            placeholder="student@example.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">
            Student Password
          </label>
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
            type="password"
            placeholder="••••••••"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="studentSection">
            Section
          </label>
          <input
            name="studentSection"
            value={formData.studentSection}
            onChange={handleChange}
            className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
            type="text"
            placeholder="e.g., A, B"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="studentGrade">
            Grade
          </label>
          <input
            name="studentGrade"
            value={formData.studentGrade}
            onChange={handleChange}
            className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
            type="text"
            placeholder="e.g., 1, 2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="parentName">
            Parent Name
          </label>
          <input
            name="parentName"
            value={formData.parentName}
            onChange={handleChange}
            className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
            type="text"
            placeholder="Enter parent name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="parentEmail">
            Parent Email
          </label>
          <input
            name="parentEmail"
            value={formData.parentEmail}
            onChange={handleChange}
            className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
            type="email"
            placeholder="parent@example.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="parentPassword">
            Parent Password
          </label>
          <input
            name="parentPassword"
            value={formData.parentPassword}
            onChange={handleChange}
            className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
            type="password"
            placeholder="••••••••"
            required
          />
        </div>

        <div className="col-span-1 md:col-span-2">
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
        </div>
      </form>
    </div>
  );
};

export default RegisterStudents;