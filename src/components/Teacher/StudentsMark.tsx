import {  FormEvent, useContext, useState } from "react";
import StudentTable from "./StudentTable";

import  { Student } from "../../services/student-service";
import useStudentGrade from "../../hooks/useStudentGrade";
import studentFilterContext from "../../contexts/studentFilter/studentFilter";

const StudentsMark = () => {
  const [courseResult, setCourseResult] = useState<string>('')
  const { students, selected } = useContext(studentFilterContext)
  console.log(students)
  
  const handleSubmit = (e:FormEvent<HTMLFormElement>,student: Student) => {
   
    if (courseResult && selected?.course) {
      if(e.currentTarget)
     useStudentGrade(student._id,selected.course,courseResult)
      

    }
  }
  return (
    <StudentTable header={['Name', 'Grade', 'Course', 'Result']} title="Students Mark">
      <>
        {students?.map((s) => (
          <tr key={s._id} className="p-2 text-center hover:bg-gray-50 transition-colors cursor-pointer">
            <td className="p-2">{s.name}</td>
            <td className="p-2">{s.grade.name}</td>
            <td className="p-2">{selected?.course}</td>
            <td className="p-2">
              <form
                className="flex items-center justify-center gap-2"
                onSubmit={(e) => {
                  handleSubmit(e,s);
                }}
              >
                <input
                  type="number"
                  min={0}
                  max={100}
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