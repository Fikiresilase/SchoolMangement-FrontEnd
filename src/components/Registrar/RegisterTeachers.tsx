import { ChangeEvent, useState, FormEvent } from "react";
import registrationServices from "../../services/registration-services";
import axios, { AxiosError } from "axios";

const RegisterTeachers = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage(null); // Reset the message on form submission

    registrationServices
      .registerTeacher(formData)
      .then(() => {
        setMessage({ text: "Teacher registered successfully!", type: "success" });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
        });
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
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="w-full h-full flex justify-center items-center p-8 bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
          Teacher Information
        </h2>

        {message && (
          <div
            className={`text-sm font-medium p-3 rounded-md text-center ${
              message.type === "success"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {message.text}
          </div>
        )}

        <div>
          <label htmlFor="teacher-name" className="block text-sm font-medium text-gray-600 mb-1">
            First Name
          </label>
          <input
            id="teacher-name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            placeholder="Enter first name"
          />
        </div>

        <div>
          <label htmlFor="last-name" className="block text-sm font-medium text-gray-600 mb-1">
            Last Name
          </label>
          <input
            id="last-name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            placeholder="Enter last name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="email"
            placeholder="example@gmail.com"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 ${
            isLoading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          } text-white rounded-md font-medium transition duration-200 ease-in-out`}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default RegisterTeachers;
