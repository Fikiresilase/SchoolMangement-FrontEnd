import { useContext, useState } from "react";
import useStudentGrade from "../../hooks/useStudentGrade";
import { Student } from "../../services/student-service";
import StudentTable from "./StudentTable";
import StudentFilter from "../../hooks/studentFilter";
const StudentsMark = () => {
  const [courseResult, setCourseResult] = useState<string>('')
  const { students,selected} = useContext(StudentFilter)
  
  const handleSubmit = (student: Student) => {
   
    if (courseResult && selected?.course) {
      useStudentGrade(student._id as string, selected.course,courseResult)

    }
  }
  return (
    <StudentTable header={['Name', 'Grade', 'Course', 'Result']} title="Students Mark">
      <>
        {students.map((s) => (
          <tr key={s._id} className="p-2  hover:bg-gray-50 transition-colors cursor-pointer">
            <td className="p-2">{s.name}</td>
            <td className="p-2">{s.grade.name}</td>
            <td className="p-2">{selected?.course}</td>
            <td className="p-2">
              <form
                className="flex items-center justify-center gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(s);
                }}
              >
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={courseResult}
                  onChange={(e) => setCourseResult(e.currentTarget.value)}
                  className="w-16 p-2 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="0-100"
                />
                <button
                  type="submit"
                  className="w-20 p-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition duration-200"
                >
                  Submit
                </button>
              </form>
            </td>
          </tr>
        ))}
      </>
    </StudentTable>
  );
};

export default StudentsMark;