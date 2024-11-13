import { useState, useEffect } from 'react';
import ConfirmationModal from '../Common/ConfiramationModal';
import useStudents from '../../hooks/useStudents';
import StudentService, { Student } from '../../services/student-service';

const StudentManage = () => {
  const { students, setStudents } = useStudents();
  
  const [editedStudents, setEditedStudents] = useState<Student[]>(students);

  const [showModal, setShowModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState<'delete' | 'update' | null>(null);
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
        prevStudents.map((student) =>
          student._id === id ? updatedStudent : student
        )
      );
      setShowModal(false);
    }
  };

  const handleDelete = (id: string) => {
    const result = StudentService.delete(id ) 
   
    setStudents((prevStudents) =>
      prevStudents.filter((student) => student._id !== id)
    );
    setEditedStudents((prevStudents) =>
      prevStudents.filter((student) => student._id !== id)
    );
    setShowModal(false); 
  };

  const openModal = (id: string, actionType: 'delete' | 'update') => {
    setSelectedStudent({ id });
    setSelectedAction(actionType);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-semibold mb-6">Manage Students</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Student List</h2>

        <table className="min-w-full bg-white border border-gray-200 shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Grade</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {editedStudents.map((student, index) => (
              <tr
                key={student._id}
                className={`${
                  index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                } hover:bg-blue-100 border-b border-gray-200`}
              >
                <td className="px-4 py-2">
                  <input
                    type="text"
                    value={student.name}
                    onChange={(e) =>
                      handleEdit(student._id as string, 'name', e.target.value)
                    }
                    className="w-full bg-transparent border-0 focus:outline-none"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    value={student?.grade?.name}
                    onChange={(e) =>
                      handleEdit(student._id as string, 'grade', e.target.value)
                    }
                    className="w-full bg-transparent border-0 focus:outline-none"
                  />
                </td>
                <td className="px-4 py-2 flex space-x-2">
                  <button
                    onClick={() => openModal(student._id as string, 'update')}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => openModal(student._id as string, 'delete')}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && selectedStudent && selectedAction && (
        <ConfirmationModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={() =>
            selectedAction === 'delete'
              ? handleDelete(selectedStudent.id)
              : handleUpdate(selectedStudent.id)
          }
          actionType={selectedAction}
          message={
            selectedAction === 'delete'
              ? 'Are you sure you want to delete this student?'
              : 'Are you sure you want to update this student data?'
          }
        />
      )}
    </div>
  );
};

export default StudentManage;
