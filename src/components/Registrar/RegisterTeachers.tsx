import { ChangeEvent, useState } from "react";
import registrationServices from "../../services/registration-services";


const RegisterTeachers = () => {
  const [formData, setFormData] = useState({
    firstName:'',
    lastName: '',
    email:''
  });

  function handleSubmit() {

    registrationServices.registerTeacher(formData)
  
  }
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  return (
    <div className="w-full h-full flex justify-center items-center p-8 bg-gray-100">
      <form className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md space-y-4" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">Teacher Information</h2>
        <div>
          <label htmlFor="teacher-name" className="block text-sm font-medium text-gray-600 mb-1">
            First Name
          </label>
          <input
            id="teacher-name"
            name="firstName"
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
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="email"
            placeholder="example@gmail.com"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition duration-200 ease-in-out"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegisterTeachers;
