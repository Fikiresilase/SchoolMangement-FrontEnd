import { useState } from "react";
import { HiPlus, HiX, HiPencil, HiTrash } from "react-icons/hi";
import useGrade from "../../hooks/classes/useGrade";
import gradeService from "../../services/grade-service";
import { Grade } from "../../services/grade-service";

const ManageGrade = () => {
  const grades = useGrade();
  const [showForm, setShowForm] = useState(false);
  const [editingGrade, setEditingGrade] = useState<Grade | null>(null);
  const [newGrade, setNewGrade] = useState<Grade>({
    _id: "",
    label: 0,
    section: [],
    course: [],
  });
  const [newSection, setNewSection] = useState("");
  const [newCourse, setNewCourse] = useState("");

  const handleSubmit = () => {
    if (!newGrade.label || newGrade.section.length === 0 || newGrade.course.length === 0) {
      alert("Please fill in all fields before submitting.");
      return;
    }
    editingGrade ? gradeService.updateOne(newGrade) : gradeService.create(newGrade);
    setNewGrade({ _id: "", label: 0, section: [], course: [] });
    setEditingGrade(null);
    setShowForm(false);
  };

  const addSection = () => {
    if (newSection.trim() && !newGrade.section.includes(newSection)) {
      setNewGrade({ ...newGrade, section: [...newGrade.section, newSection] });
      setNewSection("");
    } else {
      alert("Section already exists or is empty.");
    }
  };

  const addCourse = () => {
    if (newCourse.trim() && !newGrade.course.some((c) => c.name.toLowerCase() === newCourse.toLowerCase())) {
      setNewGrade({
        ...newGrade,
        course: [...newGrade.course, { name: newCourse, addedToAverage: false }],
      });
      setNewCourse("");
    } else {
      alert("Course already exists or is empty.");
    }
  };

  const handleEdit = (grade: Grade) => {
    setNewGrade({ ...grade });
    setEditingGrade(grade);
    setShowForm(true);
  };

  const handleDelete = (gradeId: string) => {
    if (window.confirm(`Are you sure you want to delete Grade ${gradeId}?`)) {
      gradeService.delete(gradeId);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="mb-8 max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent text-center animate-fade-in">
          Manage Grades
        </h1>
        <p className="text-sm text-gray-500 text-center mt-2">Add, Edit, or Remove Grade Levels</p>
      </header>

      <div className="max-w-7xl mx-auto">
        <button
          className="bg-indigo-600 text-white flex items-center gap-2 p-3 rounded-xl hover:bg-indigo-700 shadow-md transition-all duration-300 transform hover:-translate-y-1"
          onClick={() => {
            setShowForm(true);
            setEditingGrade(null);
            setNewGrade({ _id: "", label: 0, section: [], course: [] });
          }}
        >
          <HiPlus className="text-lg" />
          Add New Grade
        </button>

        {showForm && (
          <div className="p-6 bg-white rounded-xl mt-6 shadow-lg border border-gray-100 animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-700">
                {editingGrade ? "Edit Grade" : "Add New Grade"}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                <HiX className="text-red-500 text-xl" />
              </button>
            </div>

            <input
              type="number"
              placeholder="Grade Label (e.g., 1, 2, 3)"
              className="border border-gray-200 p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={newGrade.label || ""}
              onChange={(e) => setNewGrade({ ...newGrade, label: Number(e.target.value) })}
              disabled={!!editingGrade}
            />

            {/* Section Input */}
            <div className="mb-4">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Add Section (e.g., A, B)"
                  className="border border-gray-200 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={newSection}
                  onChange={(e) => setNewSection(e.target.value)}
                />
                <button
                  className="bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                  onClick={addSection}
                >
                  <HiPlus className="text-lg" />
                </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {newGrade.section.map((sec, index) => (
                  <span
                    key={index}
                    className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {sec}
                  </span>
                ))}
              </div>
            </div>

            {/* Course Input */}
            <div className="mb-4">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Add Course (e.g., Math, Science)"
                  className="border border-gray-200 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={newCourse}
                  onChange={(e) => setNewCourse(e.target.value)}
                />
                <button
                  className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-colors duration-200"
                  onClick={addCourse}
                >
                  <HiPlus className="text-lg" />
                </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {newGrade.course.map((c, index) => (
                  <span
                    key={index}
                    className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {c.name}
                  </span>
                ))}
              </div>
            </div>

            <button
              className="bg-indigo-600 text-white p-3 rounded-lg w-full hover:bg-indigo-700 shadow-md transition-all duration-300"
              onClick={handleSubmit}
            >
              {editingGrade ? "Update Grade" : "Submit Grade"}
            </button>
          </div>
        )}

        {/* Grades List */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Existing Grades</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {grades?.map((grade) => (
              <div
                key={grade._id}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg border border-gray-100 transition-all duration-300 transform hover:-translate-y-1 relative"
              >
                <h3 className="text-lg font-semibold text-gray-700">Grade {grade.label}</h3>
                <p className="text-sm text-gray-600 mt-2">
                  <span className="font-medium">Sections:</span> {grade.section.join(", ")}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-medium">Courses:</span>{" "}
                  {grade.course.map((c) => c.name).join(", ")}
                </p>
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <button
                    className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 shadow-md transition-colors duration-200"
                    onClick={() => handleEdit(grade)}
                  >
                    <HiPencil className="text-lg" />
                  </button>
                  <button
                    className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 shadow-md transition-colors duration-200"
                    onClick={() => handleDelete(grade._id)}
                  >
                    <HiTrash className="text-lg" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageGrade;