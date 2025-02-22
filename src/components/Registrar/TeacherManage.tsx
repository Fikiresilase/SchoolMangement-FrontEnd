import { useState, useEffect } from "react";
import ConfirmationModal from "../Common/ConfiramationModal";
import useTeachers from "../../hooks/teacher/useTeachers";
import TeacherService, { Teacher } from "../../services/teacher-service";

const TeacherManage = () => {
  const { teachers, setTeachers } = useTeachers();
  const [editedTeachers, setEditedTeachers] = useState<Teacher[]>(teachers);
  const [showModal, setShowModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState<"delete" | "update" | null>(null);
  const [selectedTeacher, setSelectedTeacher] = useState<{ id: string } | null>(null);

  useEffect(() => {
    setEditedTeachers(teachers);
  }, [teachers]);

  const handleEdit = (id: string, field: string, value: string) => {
    setEditedTeachers((prevTeachers) =>
      prevTeachers.map((teacher) =>
        teacher._id === id ? { ...teacher, [field]: value } : teacher
      )
    );
  };

  const handleUpdate = (id: string) => {
    const updatedTeacher = editedTeachers.find((teacher) => teacher._id === id);
    if (updatedTeacher) {
      setTeachers((prevTeachers) =>
        prevTeachers.map((teacher) => (teacher._id === id ? updatedTeacher : teacher))
      );
      TeacherService.updateOne<Teacher>(updatedTeacher as Teacher);
      setShowModal(false);
    }
  };

  const handleDelete = (id: string) => {
    TeacherService.delete(id);
    setTeachers((prevTeachers) => prevTeachers.filter((teacher) => teacher._id !== id));
    setEditedTeachers((prevTeachers) => prevTeachers.filter((teacher) => teacher._id !== id));
    setShowModal(false);
  };

  const openModal = (id: string, actionType: "delete" | "update") => {
    setSelectedTeacher({ id });
    setSelectedAction(actionType);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex justify-center items-start">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-4xl border border-gray-100 animate-fade-in">
        <header className="mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent text-center">
            Manage Teachers
          </h2>
          <p className="text-sm text-gray-500 text-center mt-2">Edit or remove teacher records</p>
        </header>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                {["Name", "Email", "Actions"].map((header) => (
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
              {editedTeachers.map((teacher, index) => (
                <tr
                  key={teacher._id}
                  className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-indigo-50 transition-all duration-200`}
                >
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      value={teacher.name}
                      onChange={(e) => handleEdit(teacher._id as string, "name", e.target.value)}
                      className="w-full bg-transparent border border-gray-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      value={teacher.email}
                      onChange={(e) => handleEdit(teacher._id as string, "email", e.target.value)}
                      className="w-full bg-transparent border border-gray-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </td>
                  <td className="px-6 py-4 flex space-x-2">
                    <button
                      onClick={() => openModal(teacher._id as string, "update")}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-200"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => openModal(teacher._id as string, "delete")}
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

      {showModal && selectedTeacher && selectedAction && (
        <ConfirmationModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={() =>
            selectedAction === "delete"
              ? handleDelete(selectedTeacher.id)
              : handleUpdate(selectedTeacher.id)
          }
          actionType={selectedAction}
          message={
            selectedAction === "delete"
              ? "Are you sure you want to delete this teacher?"
              : "Are you sure you want to update this teacher data?"
          }
        />
      )}
    </div>
  );
};

export default TeacherManage;