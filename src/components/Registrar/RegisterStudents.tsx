import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface FormData {
  name: string;
  email: string;
  section: string;
  password: string;
}

const RegisterStudents = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    section: '',
    password: '',
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
    await axios.post('http://localhost:3000/api/register/student', formData);
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full p-4 flex flex-col gap-2">
      <h2>Student Info</h2>
      <div className="w-full flex gap-2">
        <input
          name="name"
          onChange={handleChange}
          className="border-[2px] border-slate-300 p-2"
          type="text"
          placeholder="Student Name"
        />
      </div>
      <input
        name="email"
        onChange={handleChange}
        className="border-[2px] border-slate-300 p-2"
        type="email"
        placeholder="example@gmail.com"
      />
      <input
        name="section"
        onChange={handleChange}
        className="border-[2px] border-slate-300 p-2"
        type="text"
        placeholder="Section"
      />
      <input
        name="password"
        onChange={handleChange}
        className="border-[2px] border-slate-300 p-2"
        type="password"
        placeholder="Password"
      />
      
      <input
        type="submit"
        value="Submit"
        className="relative w-[70px] p-2 text-center text-white bg-slate-600 rounded-md hover:bg-slate-900 "
      />
    </form>
  );
};

export default RegisterStudents;
