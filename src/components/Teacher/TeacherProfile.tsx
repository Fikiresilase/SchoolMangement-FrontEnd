import { ChangeEvent, FormEvent, useState } from "react";
import useTeacher from "../../hooks/teacher/useTeachers";
import TeacherService, { Teacher } from "../../services/teacher-service";
import ListItem from "../Common/ListItem";

const TeacherProfile = () => {
  const teacherId = "66fbe6ae5bbf2d8c74209c41";
  const { teacher } = useTeacher(teacherId);
  const [updatedTeacher, setUpdatedTeacher] = useState<Teacher>({} as Teacher);

  function handleSubmit(e: FormEvent) {
    
    e.preventDefault();
    TeacherService.updateOne<Teacher>(updatedTeacher);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setUpdatedTeacher({
      ...updatedTeacher,
      _id: teacherId,
      email: e.target.name === "email" ? e.target.value : updatedTeacher.email || teacher?.email as any,
      password:
        e.target.name === "password" ? e.target.value : updatedTeacher.password || "",
    });
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="mb-8 max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent text-center animate-fade-in">
          My Profile
        </h1>
        <p className="text-sm text-gray-500 text-center mt-2">Update your teacher information</p>
      </header>

      <div className="max-w-7xl mx-auto">
        <ListItem title={teacher?.name as string} subTitle="Teacher" img="sjsjsakkms" />
        <form onSubmit={handleSubmit}>
          <div className="overflow-x-auto bg-white shadow-md rounded-xl border border-gray-100 mt-6">
            <table className="w-full table-auto">
              <thead className="bg-gray-50">
                <tr>
                  {["Name", "Email", "Password", "Actions"].map((header) => (
                    <th
                      key={header}
                      className="py-3 px-6 text-left text-sm font-semibold text-gray-700 border-b"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-indigo-50 transition-all duration-200">
                  <td className="py-3 px-6 text-gray-700">{teacher?.name}</td>
                  <td className="py-3 px-6">
                    <input
                      type="email"
                      name="email"
                      placeholder={teacher?.email || "Enter email"}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                    />
                  </td>
                  <td className="py-3 px-6">
                    <input
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                    />
                  </td>
                  <td className="py-3 px-6 text-center">
                    <button
                      type="submit"
                      className="px-4 py-2 text-white bg-indigo-600 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-200"
                    >
                      Save Changes
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherProfile;