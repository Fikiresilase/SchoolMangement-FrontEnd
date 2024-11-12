import { ChangeEvent, useRef, useState } from "react";
import useGrade from "../../hooks/useGrade";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Grade } from "../../services/grade-service";
import teacherService from "../../services/teacher-service";

const AssignTeachers = () => {
    const [selections, setSelections] = useState<{ grade: string; section: string[] }[]>([]);
    const [teacher, setTeacher] = useState('');
    const searchInput = useRef<HTMLInputElement>(null);

    const grades = useGrade();

    function handleChange(e: ChangeEvent<HTMLInputElement>, g: Grade) {
        const selectedSection = e.currentTarget.value;
        const isChecked = e.currentTarget.checked;

        setSelections((prevSelections) => {
            const gradeSelection = prevSelections.find((s) => s.grade === g.label);
            if (gradeSelection) {
                const updatedSections = isChecked
                    ? [...gradeSelection.section, selectedSection]
                    : gradeSelection.section.filter((s) => s !== selectedSection);

                return prevSelections.map((selection) =>
                    selection.grade === g.label
                        ? { ...selection, section: updatedSections }
                        : selection
                );
            } else {
                return [...prevSelections, { grade: g.label, section: [selectedSection] }];
            }
        });
    }

    function search() {
        if (searchInput.current) {
            teacherService.getTeacher(searchInput.current.value).requestTeacher
                .then((res) => setTeacher(res.data.name));
        }
    }

    function handleSubmit() {
       
    }

    return (
        <div className="w-full h-full p-6 bg-gray-100">
            <div className="flex flex-col lg:flex-row justify-between gap-6">
                <div className="flex flex-col w-full lg:w-[60%] bg-white rounded-lg p-6 shadow-md">
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                        <div className="flex items-center gap-3">
                            <input
                                ref={searchInput}
                                type="search"
                                placeholder="Search for teachers..."
                                className="w-full lg:w-[200px] p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button type="button" onClick={search} className="text-gray-500 hover:text-blue-500">
                                <i className="bi bi-search text-xl"></i>
                            </button>
                        </div>
                        {teacher && (
                            <div className="p-2 text-blue-700 font-medium border border-blue-300 rounded-md">
                                Assigned Teacher: {teacher}
                            </div>
                        )}
                        {grades?.map((g) => (
                            <div key={g._id} className="border-b border-gray-200 pb-4">
                                <span className="block font-semibold text-gray-800 mb-2 text-lg">Grade {g.label}</span>
                                <div className="flex flex-wrap gap-4">
                                    {g.section.map((s) => (
                                        <label key={`${g._id}-${s}`} className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                onChange={(e) => handleChange(e, g)}
                                                value={s}
                                                checked={
                                                    selections.find((selection) => selection.grade === g.label)?.section.includes(s) || false
                                                }
                                                className="form-checkbox h-5 w-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-400"
                                            />
                                            <span className="text-gray-700">{s}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <button type="submit" className="self-start mt-4 px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">
                            Assign Teachers
                        </button>
                    </form>
                </div>
                <div className="w-full lg:w-[35%] bg-white rounded-lg p-6 shadow-md">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Assigned Grades & Sections</h3>
                    {selections.map((selection, index) => (
                        <div key={index} className={ `${selection.section.length >0 ?  ' flex flex-col gap-2 p-3 border border-gray-300 rounded-lg mb-3 bg-gray-50' : 'hidden' } `}>
                            <span className="font-medium text-blue-700">Grade { selection.grade}</span>
                            <div className="flex flex-wrap gap-2">
                                {selection.section.map((s, i) => (
                                    <span key={i} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                        {s}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AssignTeachers;
