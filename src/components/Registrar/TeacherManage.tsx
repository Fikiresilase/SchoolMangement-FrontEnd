import { useState, useEffect } from 'react';
import ConfirmationModal from '../Common/ConfiramationModal';
import useTeachers from '../../hooks/useTeachers';
import TeacherService, { Teacher } from '../../services/teacher-service'

const TeacherManage = () => {
  const { teachers, setTeachers } = useTeachers();
  
  const [editedTeachers, setEditedTeachers] = useState<Teacher[]>(teachers);

  const [showModal, setShowModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState<'delete' | 'update' | null>(null);
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
        const updatedteacher = editedTeachers.find((teacher) => teacher._id === id);
        if (updatedteacher) {
            setTeachers((prevTeachers) =>
                prevTeachers.map((teacher) =>
                    teacher._id === id ? updatedteacher : teacher
        )
    );
    setShowModal(false);
}
TeacherService.updateOne<Teacher>(updatedteacher as Teacher) 
};

  const handleDelete = (id: string) => {
    //deletes Teachers to be refact later
     TeacherService.delete(id) 
   
    setTeachers((prevTeachers) =>
      prevTeachers.filter((teacher) => teacher._id !== id)
    );
    setEditedTeachers((prevTeachers) =>
      prevTeachers.filter((teacher) => teacher._id !== id)
    );
    setShowModal(false); 
  };

  const openModal = (id: string, actionType: 'delete' | 'update') => {
    setSelectedTeacher({ id });
    setSelectedAction(actionType);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-semibold mb-6">Manage Teachers</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Teacher List</h2>

        <table className="min-w-full bg-white border border-gray-200 shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {editedTeachers.map((teacher, index) => (
              <tr
                key={teacher._id}
                className={`${
                  index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                } hover:bg-blue-100 border-b border-gray-200`}
              >
                <td className="px-4 py-2">
                  <input
                    type="text"
                    value={teacher.name}
                    onChange={(e) =>
                      handleEdit(teacher._id as string, 'name', e.target.value)
                    }
                    className="w-full bg-transparent border-0 focus:outline-none"
                  />
                    </td>

                    <td className="px-4 py-2">
                  <input
                    type="text"
                    value={teacher.email}
                    onChange={(e) =>
                      handleEdit(teacher._id as string, 'name', e.target.value)
                    }
                    className="w-full bg-transparent border-0 focus:outline-none"
                  />
                </td>
                
                <td className="px-4 py-2 flex space-x-2">
                  <button
                    onClick={() => openModal(teacher._id as string, 'update')}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => openModal(teacher._id as string, 'delete')}
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

      {showModal && selectedTeacher && selectedAction && (
        <ConfirmationModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={() =>
            selectedAction === 'delete'
              ? handleDelete(selectedTeacher.id)
              : handleUpdate(selectedTeacher.id)
          }
          actionType={selectedAction}
          message={
            selectedAction === 'delete'
              ? 'Are you sure you want to delete this teacher?'
              : 'Are you sure you want to update this teacher data?'
          }
        />
      )}
    </div>
  );
};

export default TeacherManage;
