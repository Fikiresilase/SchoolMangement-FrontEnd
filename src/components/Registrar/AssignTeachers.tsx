import { ChangeEvent, FormEvent, useRef, useState } from "react";
import useGrade from "../../hooks/classes/useGrade";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Grade } from "../../services/grade-service";
import teacherService, { Teacher, Course } from "../../services/teacher-service";

interface Selection {
    name: number;
    section: string[];
}

const AssignTeachers = () => {
    const [selections, setSelections] = useState<Selection[]>([]);
    const [teacher, setTeacher] = useState<Teacher>();
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false); // New: Loading state
    const searchInput = useRef<HTMLInputElement>(null);
    const grades = useGrade();

    function handleChange(e: ChangeEvent<HTMLInputElement>, g: Grade) {
        const selectedSection = e.currentTarget.value;
        const isChecked = e.currentTarget.checked;

        setSelections((prevSelections) => {
            const gradeSelection = prevSelections.find((s) => s.name === g.label);
            if (gradeSelection) {
                const updatedSections = isChecked
                    ? [...gradeSelection.section, selectedSection]
                    : gradeSelection.section.filter((s) => s !== selectedSection);
                return prevSelections.map((selection) =>
                    selection.name === g.label
                        ? { ...selection, section: updatedSections }
                        : selection
                );
            } else {
                return [...prevSelections, { name: g.label, section: [selectedSection] }];
            }
        });
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        let updatedTeacher: Teacher = teacher as Teacher;

        selections.forEach((sel) => {
            if (updatedTeacher.grade.find((g) => g.name === sel.name)) {
                let updatedSection = updatedTeacher.grade.find((g) => g.name === sel.name)?.section;
                updatedSection = updatedSection?.concat(sel.section.filter((s) => !updatedSection?.includes(s)));
                updatedTeacher.grade.forEach((g) => {
                    if (g.name === sel.name) g.section = updatedSection as string[];
                });
            } else {
                updatedTeacher.grade.push({ ...sel, course: [] });
            }
        });

        try {
            await teacherService.updateOne(updatedTeacher);
            setSuccessMessage("Teacher assignments updated successfully!");
            setTimeout(() => setSuccessMessage(null), 3000);
        } catch {
            setError("Error updating teacher assignments");
        } finally {
            setIsLoading(false);
        }
    }

    async function handleSearch(e: FormEvent) {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const { request } = teacherService.getAll<Teacher[]>();
        try {
            const res = await request;
            setTeacher(res.data.find((t) => t.name.includes(searchInput.current?.value as string)));
        } catch {
            setError("Error fetching teacher data");
        } finally {
            setIsLoading(false);
        }
    }

    async function handleNameChange(e: FormEvent) {
        e.preventDefault();
        setError(null);
        const { request } = teacherService.getAll<Teacher[]>();
        if (searchInput.current?.value) {
            try {
                const res = await request;
                setTeacher(res.data.find((t) => t.name.includes(searchInput.current?.value as string)));
            } catch {
                setError("Error fetching teacher data");
            }
        } else {
            setTeacher(undefined);
        }
    }

    function showCurrentClasses(teacher: Teacher) {
        let assignedClasses: Selection[] = [];
        teacher.grade.forEach((g) => {
            assignedClasses.push({ name: g.name, section: g.section });
        });
        assignedClasses.sort((a, b) => a.name - b.name);
        setSelections(assignedClasses);
    }

    return (
        <div className="w-full min-h-screen p-6 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
       
            <div className="flex items-center gap-3 mb-8">
                <form onSubmit={handleSearch} className="w-full lg:w-[400px] flex items-center gap-2 relative">
                    <input
                        ref={searchInput}
                        onChange={handleNameChange}
                        type="search"
                        placeholder="Search for teachers..."
                        className="w-full p-3 pl-10 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-white"
                    />
                    <button
                        className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all duration-200 shadow-md"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <i className="bi bi-arrow-repeat animate-spin text-xl"></i>
                        ) : (
                            <i className="bi bi-search text-xl"></i>
                        )}
                    </button>
                </form>
            </div>

            {error && (
                <div className="mt-4 text-red-700 bg-red-100 p-4 rounded-lg shadow-md animate-fade-in">
                    {error}
                </div>
            )}

         
            <div className="flex flex-col lg:flex-row justify-between gap-8">
            
                <div className="flex flex-col w-full lg:w-[60%] bg-white rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
                        {teacher && (
                            <div
                                onClick={() => showCurrentClasses(teacher)}
                                className="p-3 text-indigo-700 font-semibold border border-indigo-300 rounded-md cursor-pointer hover:bg-indigo-50 transition-all duration-200 flex items-center gap-2"
                            >
                                <i className="bi bi-person-fill text-lg"></i>
                                Assign Teacher: {teacher.name}
                            </div>
                        )}

                        {grades?.map((g) => (
                            <div key={g._id} className="border-b border-gray-100 pb-4">
                                <span className="block font-semibold text-gray-800 mb-3 text-xl">
                                    Grade {g.label}
                                </span>
                                <div className="flex flex-wrap gap-4">
                                    {g.section.map((s) => (
                                        <label
                                            key={`${g._id}-${s}`}
                                            className="flex items-center gap-2 cursor-pointer group"
                                        >
                                            <input
                                                type="checkbox"
                                                disabled={teacher === undefined}
                                                onChange={(e) => handleChange(e, g)}
                                                value={s}
                                                checked={
                                                    selections
                                                        .find((selection) => selection.name === g.label)
                                                        ?.section.includes(s) || false
                                                }
                                                className="form-checkbox h-5 w-5 text-indigo-500 rounded focus:ring-2 focus:ring-indigo-400 transition-all duration-200"
                                            />
                                            <span className="text-gray-700 group-hover:text-indigo-600 transition-colors duration-200">
                                                {s}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <input
                            value="Assign Teachers"
                            type="submit"
                            disabled={isLoading || !teacher}
                            className={`self-start mt-4 px-6 py-3 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 transition-all duration-300 ${
                                isLoading || !teacher ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        />
                    </form>
                </div>
                <div className="w-full lg:w-[35%] bg-white rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <i className="bi bi-check-circle text-indigo-600"></i>
                        Assigned Grades & Sections
                    </h3>
                    {selections.length === 0 ? (
                        <p className="text-gray-500 italic">No assignments yet.</p>
                    ) : (
                        selections.map((selection, index) => (
                            <div
                                key={index}
                                className={`${
                                    selection.section.length > 0
                                        ? "flex flex-col gap-2 p-4 border border-gray-200 rounded-lg mb-4 bg-gray-50 transition-all duration-200 hover:bg-indigo-50"
                                        : "hidden"
                                }`}
                            >
                                <span className="font-medium text-indigo-700">Grade {selection.name}</span>
                                <div className="flex flex-wrap gap-2">
                                    {selection.section.map((s, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium cursor-pointer hover:bg-indigo-200 transition-all duration-200 shadow-sm"
                                        >
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {successMessage && (
                <div className="fixed bottom-6 right-6 bg-green-600 text-white py-3 px-6 rounded-lg shadow-lg flex items-center gap-2 animate-slide-up">
                    <i className="bi bi-check-circle-fill"></i>
                    {successMessage}
                </div>
            )}
        </div>
    );
};

export default AssignTeachers;