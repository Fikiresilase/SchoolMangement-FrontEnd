import { useState, ChangeEvent, FormEvent } from 'react';
import { Grade } from '../../services/student-service';
import registrationServices, { StudentForm } from '../../services/registration-services';

const RegisterStudents = () => {
  const [formData, setFormData] = useState<StudentForm>({
    name: '',
    grade:0,
    email: '',
    section: '',
    password: '',
  
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await registrationServices.registerStudent(formData);
      setSuccessMessage('Student registered successfully!');
      setFormData({
        name: '',
        grade: 1,
        email: '',
        section: '',
        password: '',
       
      });
    } catch (error) {
      setSuccessMessage('Failed to register student. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center p-8 bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">Register Student</h2>

        {successMessage && (
          <div
            className={`text-sm font-medium p-3 rounded-md text-center ${
              successMessage.includes('successfully')
                ? 'bg-green-100 text-green-600'
                : 'bg-red-100 text-red-600'
            }`}
          >
            {successMessage}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="name">
            Student Name
          </label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            placeholder="Enter student name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="email">
            Email
          </label> 
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="email"
            placeholder="example@gmail.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="grade">
            Grade
          </label>
          <input
            name="grade"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="number"
            min={1}
            max={12}
            placeholder="Grade"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="section">
            Section
          </label>
          <input
            name="section"
            value={formData.section}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            placeholder="Section"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="password">
            Password
          </label>
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="password"
            placeholder="Password"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 ${
            isLoading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          } text-white rounded-md font-medium transition duration-200 ease-in-out`}
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default RegisterStudents;
