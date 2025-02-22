import { FormEvent, useContext, useState } from "react";
import StudentTable from "./StudentTable";
import { Student } from "../../services/student-service";
import useStudentGrade from "../../hooks/students/useStudentGrade";
import studentFilterContext from "../../contexts/studentFilter/studentFilter";

const StudentsMark = () => {
  const [courseResult, setCourseResult] = useState<string>("");
  const { students, selected } = useContext(studentFilterContext);

  const handleSubmit = (e: FormEvent<HTMLFormElement>, student: Student) => {
    e.preventDefault();
    if (courseResult && selected?.course) {
      useStudentGrade(student._id, selected.course, courseResult);
      setCourseResult("");
    }
  };

  return (
    <StudentTable header={["Name", "Grade", "Course", "Result"]} title="Students Mark">
      <>
        {students?.map((s) => (
          <tr
            key={s._id}
            className="text-center hover:bg-indigo-50 transition-all duration-200 cursor-pointer"
          >
            <td className="py-3 px-6 text-gray-700">{s.name}</td>
            <td className="py-3 px-6 text-gray-700">{s.grade.name}</td>
            <td className="py-3 px-6 text-gray-700">{selected?.course || "N/A"}</td>
            <td className="py-3 px-6">
              <form
                className="flex items-center justify-center gap-3"
                onSubmit={(e) => handleSubmit(e, s)}
              >
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={courseResult}
                  onChange={(e) => setCourseResult(e.target.value)}
                  className="w-20 p-2 text-center border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                  placeholder="0-100"
                />
                <button
                  type="submit"
                  className="w-24 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-200"
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