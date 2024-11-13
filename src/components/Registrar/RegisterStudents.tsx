import { useState, ChangeEvent, FormEvent } from 'react';
import {  Grade } from '../../services/student-service';
import registrationServices from '../../services/registration-services';
import { Student } from '../../services/student-service';



const RegisterStudents = () => {
  const [formData, setFormData] = useState<Student>({
    name: '',
    grade:{} as Grade,
    email: '',
    section: '',
    password: '',
    course:[]
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    registrationServices.registerStudent(formData as Student)
    console.log(formData);
  };

  return (
    <div className="w-full h-full flex justify-center items-center p-8 bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md space-y-4">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">Register Student</h2>
        
  
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="name">Student Name</label>
          <input
            id="name"
            name="name"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            placeholder="Enter student name"
          />
        </div>

     
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="email"
            placeholder="example@gmail.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="section">Grade</label>
          <input
            id="sectgradeion"
            name="Grade"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            placeholder="Section"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="section">Section</label>
          <input
            id="section"
            name="section"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            placeholder="Section"
          />
        </div>

       
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="password"
            placeholder="Password"
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

export default RegisterStudents;