import { ChangeEvent, useState } from "react";
import useTeacher from "../../hooks/useTeachers";
import TeacherService, { Teacher } from "../../services/teacher-service";
import ListItem from "../Common/ListItem";

const TeacherProfile = () => {
  const teacherId = '66fbe6ae5bbf2d8c74209c41'

  const { teacher } = useTeacher(teacherId)
  const [updatedTeacher,setUpdatedTeacher]= useState<Teacher>({} as Teacher)
  function handleSubmit() {
    TeacherService.updateOne<Teacher>(updatedTeacher)
  }
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setUpdatedTeacher({
      ...updatedTeacher,
      _id: teacherId,
      email: e.target.name === 'email' ? e.target.value : updatedTeacher.email,
      password: e.target.name === 'password' ? e.target.value : updatedTeacher.password
    })

  }
     
  return (
    <div className="w-full min-h-screen px-6 py-4 bg-gray-50">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">My Profile</h1>
      <ListItem title={teacher?.name as string} subTitle="his branch" img='sjsjsakkms' />
      <form onSubmit={handleSubmit}>
      <table className="w-full mt-6 border border-gray-300 rounded-lg shadow-sm bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 border-b">Name</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 border-b">Email</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 border-b">Password</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 border-b">Actions</th>
          </tr>
        </thead>
        
        <tbody>
          <tr className="hover:bg-gray-50 transition-colors">
            <td className="py-3 px-4 text-gray-700">{teacher?.name}</td>
            <td className="py-3 px-4">
                <input
                type="email"
                name="email"
                placeholder="Enter email"
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </td>
            <td className="py-3 px-4">
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </td>
            <td className="py-3 px-4 text-center">
              <button className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200">
                Save Changes
              </button>
              
            </td>
       
          </tr>
          
          
         
        </tbody>
        </table>
      </form>
      
    </div>
  );
};

export default TeacherProfile;
