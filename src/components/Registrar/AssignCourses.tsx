import { FormEvent, useRef, useState, useEffect } from "react";
import teacherService, { Teacher, Course } from "../../services/teacher-service";
import useGrade from "../../hooks/classes/useGrade";
import useTeacher from "../../hooks/teacher/useTeachers";
import { HiOutlinePlusCircle, HiOutlineCheckCircle, HiXCircle, HiOutlineMinusCircle } from "react-icons/hi";

interface Selection {
  name: number;
  course: Course[];
}

const AssignCourses = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const { teacher } = useTeacher();
  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [assignedCourses, setAssignedCourses] = useState<Course[]>([]);
  const [availableCourses, setAvailableCourses] = useState<Course[]>([]);
  const [selections, setSelections] = useState<Selection[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const searchInput = useRef<HTMLInputElement>(null);
  const grades = useGrade();

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const { request } = teacherService.getAll<Teacher[]>();
        const response = await request;
        setTeachers(response.data);
        console.log("Fetched teachers:", response.data); 
      } catch (err) {
        setError("Error fetching teachers.");
        console.error("Fetch teachers error:", err);
      }
    };
    fetchTeachers();
  }, []);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const query = searchInput.current?.value.toLowerCase() || "";
    setFilteredTeachers(query ? teachers.filter((t) => t.name.toLowerCase().includes(query)) : []);
  };

  const handleSelectTeacher = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    const teacherCourses = getTeacherCourses(teacher);
    setAssignedCourses(teacherCourses);
    const available = teacher.grade.map((g) => getAvailableCourses(g.name)).flat();
    setAvailableCourses(available);
    setSelections([]);
    console.log("Selected teacher courses:", teacherCourses); 
    console.log("Available courses:", available);
  };

  const getTeacherCourses = (teacher: Teacher): Course[] => {
    const courses = teacher.grade.flatMap(g => g.course || []).filter(c => c && c.name);
    return courses.length > 0 ? courses : [];
  };

  const getAvailableCourses = (gradeLabel: number): Course[] => {
    const gradeCourses = (grades?.find((g) => g.label === gradeLabel)?.course || []).filter(c => c && c.name);
    const assignedCourses = selectedTeacher?.grade.flatMap((g) => g.course || []).filter(c => c && c.name) || [];
    const available = gradeCourses.filter((c) => 
      !assignedCourses.some((ac) => ac.name === c.name)
    );
    return available.length > 0 ? available : [];
  };

  const handleAssignCourse = (course: Course, gradeLabel: number) => {
    if (!course || !course.name) return; 
    setSelections((prevSelections) => {
      const existingSelection = prevSelections.find((s) => s.name === gradeLabel);
      if (existingSelection) {
        if (existingSelection.course.some(c => c.name === course.name)) return prevSelections;
        return prevSelections.map((s) => 
          s.name === gradeLabel 
            ? { ...s, course: [...s.course, course] }
            : s
        );
      }
      return [...prevSelections, { name: gradeLabel, course: [course] }];
    });
  };

  const handleRemoveCourse = (course: Course, gradeLabel: number) => {
    if (!course || !course.name) return; 
    setSelections((prevSelections) => {
      const updatedSelections = prevSelections.map((s) => {
        if (s.name === gradeLabel) {
          return {
            ...s,
            course: s.course.filter((c) => c.name !== course.name)
          };
        }
        return s;
      }).filter((s) => s.course.length > 0);
      return updatedSelections;
    });
  };

  const handleSubmit = async () => {
    if (!selectedTeacher) {
      setError("Please select a teacher first.");
      return;
    }

    const updatedTeacher = {
      ...selectedTeacher,
      grade: selectedTeacher.grade.map(grade => ({
        ...grade,
        course: [
          ...grade.course,
          ...(selections.find(s => s.name === grade.name)?.course || [])
        ].filter(c => c && c.name) 
      }))
    };

    try {
      const response = await teacherService.updateOne(updatedTeacher);
      setSuccessMessage(`Courses assigned to ${response.data?.name} successfully!`);
      setSelectedTeacher(updatedTeacher);
      setAssignedCourses(getTeacherCourses(updatedTeacher));
      setAvailableCourses(updatedTeacher.grade.map((g) => getAvailableCourses(g.name)).flat());
      setSelections([]);
      setError(null);
      console.log("Updated teacher:", updatedTeacher); 
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Submit error:", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="p-6 w-full max-w-4xl bg-white shadow-lg rounded-2xl border border-white/50">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Assign Courses to Teachers
        </h2>

        <div className="mb-4">
          <input
            ref={searchInput}
            type="search"
            placeholder="Search for teachers..."
            onChange={handleSearch}
            className="w-full p-3 border border-gray-300 rounded-lg bg-white/40 backdrop-blur-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          {filteredTeachers.length > 0 && (
            <ul className="absolute w-1/3 bg-white/90 border border-gray-300 rounded-lg shadow-md mt-2 max-h-40 overflow-auto z-10">
              {filteredTeachers.map((teacher) => (
                <li
                  key={teacher.name}
                  onClick={() => handleSelectTeacher(teacher)}
                  className="p-3 cursor-pointer hover:bg-gray-200 transition"
                >
                  {teacher.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {selectedTeacher && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                {selectedTeacher.name}'s Current Assignments
              </h3>
              <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                {selectedTeacher.grade.map((grade) => (
                  <div key={grade.name}>
                    <h4 className="text-md font-medium text-gray-600">
                      Grade {grade.name}
                    </h4>
                    <div className="flex flex-wrap gap-2 mt-1 mb-2">
                      {grade.course.filter(c => c && c.name).map((course) => (
                        <span
                          key={course.name}
                          className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-sm"
                        >
                          {course.name}
                        </span>
                      ))}
                    </div>
                    <h5 className="text-sm font-medium text-gray-600">
                      Available Courses
                    </h5>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {getAvailableCourses(grade.name).map((course) => (
                        <button
                          key={course.name}
                          className="bg-green-400 text-white px-2 py-1 rounded-lg text-sm shadow hover:bg-green-500 transition flex items-center gap-1"
                          onClick={() => handleAssignCourse(course, grade.name)}
                        >
                          {course.name} <HiOutlinePlusCircle className="text-base" />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              {selections.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Selected Courses to Assign
                  </h3>
                  <div className="space-y-2 max-h-[50vh] overflow-y-auto">
                    {selections.map((selection) => (
                      <div key={selection.name}>
                        <p className="text-sm font-medium">Grade {selection.name}:</p>
                        <div className="flex flex-wrap gap-2">
                          {selection.course.filter(c => c && c.name).map((course) => (
                            <div
                              key={course.name}
                              className="flex items-center bg-yellow-100 text-yellow-800 px-2 py-1 rounded-lg text-sm"
                            >
                              {course.name}
                              <button
                                className="ml-1 text-red-600 hover:text-red-800"
                                onClick={() => handleRemoveCourse(course, selection.name)}
                              >
                                <HiOutlineMinusCircle className="text-base" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition shadow-md font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
                onClick={handleSubmit}
                disabled={selections.length === 0}
              >
                Assign Selected Courses
              </button>

              {successMessage && (
                <div className="mt-3 flex items-center gap-2 bg-green-100 text-green-700 px-3 py-2 rounded-lg text-sm">
                  <HiOutlineCheckCircle className="text-lg" /> {successMessage}
                </div>
              )}
              {error && (
                <div className="mt-3 flex items-center gap-2 bg-red-100 text-red-700 px-3 py-2 rounded-lg text-sm">
                  <HiXCircle className="text-lg" /> {error}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignCourses;