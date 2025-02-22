import { useState, useEffect } from "react";
import ConfirmationModal from "../Common/ConfiramationModal";
import useStudents from "../../hooks/students/useStudents";
import StudentService, { Student } from "../../services/student-service";

const StudentManage = () => {
  const { students, setStudents } = useStudents();
  const [editedStudents, setEditedStudents] = useState<Student[]>(students);
  const [showModal, setShowModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState<"delete" | "update" | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<{ id: string } | null>(null);

  useEffect(() => {
    setEditedStudents(students);
  }, [students]);

  const handleEdit = (id: string, field: string, value: string) => {
    setEditedStudents((prevStudents) =>
      prevStudents.map((student) =>
        student._id === id ? { ...student, [field]: value } : student
      )
    );
  };

  const handleUpdate = (id: string) => {
    const updatedStudent = editedStudents.find((student) => student._id === id);
    if (updatedStudent) {
      setStudents((prevStudents) =>
        prevStudents.map((student) => (student._id === id ? updatedStudent : student))
      );
      StudentService.updateOne<Student>(updatedStudent as Student);
      setShowModal(false);
    }
  };

  const handleDelete = (id: string) => {
    StudentService.delete(id);
    setStudents((prevStudents) => prevStudents.filter((student) => student._id !== id));
    setEditedStudents((prevStudents) => prevStudents.filter((student) => student._id !== id));
    setShowModal(false);
  };

  const openModal = (id: string, actionType: "delete" | "update") => {
    setSelectedStudent({ id });
    setSelectedAction(actionType);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex justify-center items-start">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-5xl border border-gray-100 animate-fade-in">
        <header className="mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent text-center">
            Manage Students
          </h2>
          <p className="text-sm text-gray-500 text-center mt-2">Edit or remove student records</p>
        </header>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                {["Name", "Grade", "Section", "Email", "Actions"].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-sm font-semibold text-gray-700 uppercase tracking-wider text-left border-b"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {editedStudents.map((student, index) => (
                <tr
                  key={student._id}
                  className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-indigo-50 transition-all duration-200`}
                >
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      value={student.name}
                      onChange={(e) => handleEdit(student._id as string, "name", e.target.value)}
                      className="w-full bg-transparent border border-gray-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      value={student?.grade?.name || ""}
                      onChange={(e) => handleEdit(student._id as string, "grade", e.target.value)}
                      className="w-full bg-transparent border border-gray-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      value={student?.section || ""}
                      onChange={(e) => handleEdit(student._id as string, "section", e.target.value)}
                      className="w-full bg-transparent border border-gray-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      value={student?.email || ""}
                      onChange={(e) => handleEdit(student._id as string, "email", e.target.value)}
                      className="w-full bg-transparent border border-gray-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </td>
                  <td className="px-6 py-4 flex space-x-2">
                    <button
                      onClick={() => openModal(student._id as string, "update")}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-200"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => openModal(student._id as string, "delete")}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && selectedStudent && selectedAction && (
        <ConfirmationModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={() =>
            selectedAction === "delete"
              ? handleDelete(selectedStudent.id)
              : handleUpdate(selectedStudent.id)
          }
          actionType={selectedAction}
          message={
            selectedAction === "delete"
              ? "Are you sure you want to delete this student?"
              : "Are you sure you want to update this student data?"
          }
        />
      )}
    </div>
  );
};

export default StudentManage;