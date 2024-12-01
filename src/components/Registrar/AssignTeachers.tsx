import { ChangeEvent, FormEvent, useRef, useState } from "react";
import useGrade from "../../hooks/useGrade";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Grade } from "../../services/grade-service";
import teacherService, { Teacher } from "../../services/teacher-service";

interface Selection {
    name: number;
    section: string[];
}


const AssignTeachers = () => {
    const [selections, setSelections] = useState<Selection[]>([]);
    const [teacher, setTeacher] = useState<Teacher>();
    const [error,setError] = useState()
    const searchInput = useRef<HTMLInputElement>(null);
    const grades = useGrade();

    function handleChange(e: ChangeEvent<HTMLInputElement>, g: Grade) {
        const selectedSection = e.currentTarget.value;
        const isChecked = e.currentTarget.checked;

        setSelections((prevSelections) => {
            const gradeSelection = prevSelections.find((s) => s.name === (g.label));
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

    

    // function handleSubmit(e: React.FormEvent) {
    //     e.preventDefault();
    //     if (teacher) {
    //         let mySection={}
    //         const newGrades = teacher.grade.forEach(g => {
    //             const previousGrade = selections.find(s => s.name === g.name)
    //             if (previousGrade) {
    //                mySection= {...mySection,}
    //                setTeacher({...teacher,grade:selections.map(s=>s)})
    //           }

    //         })
            
                
    //         // setTeacher({...teacher,grade:[...newrade,...selections>]})
    //     const updatedTeacher= {...teacher,grade:[...teacher.grade,selections]}
      
    //         teacherService.updateOne<Teacher>(updatedTeacher as Teacher)
            
    //     }
    // }
    function handleSearch(e: FormEvent) {
        e.preventDefault()

        const { request } = teacherService.getAll<Teacher[]>()
        request.then(res => setTeacher(
            res.data.find(t => t.name === searchInput.current?.value))
        ).catch(err => setError(err))
    }
        
        
        
        

    return (
        <div className="w-full h-full p-6 bg-gray-100">
            <div className="flex items-center gap-3">
                <form onSubmit={handleSearch}>
                            <input
                                ref={searchInput}
                                type="search"
                                placeholder="Search for teachers..."
                                className="w-full lg:w-[200px] p-2 my-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button className="text-gray-500 p-2 hover:text-blue-500" >
                              <i className="bi bi-search text-xl"></i>
                            </button>
                        
                  
                </form>
                        </div>
            <div className="flex flex-col lg:flex-row justify-between gap-6">
                <div className="flex flex-col w-full lg:w-[60%] bg-white rounded-lg p-6 shadow-md">
                    <form  className="flex flex-col space-y-4">
                        {teacher && (
                            <div className="p-2 text-blue-700 font-medium border border-blue-300 rounded-md">
                                Assign Teacher: {teacher.name}
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
                                                    selections.find((selection) => selection.name === g.label)?.section.includes(s) || false
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
                        <div key={index} className={`${selection.section.length > 0 ? 'flex flex-col gap-2 p-3 border border-gray-300 rounded-lg mb-3 bg-gray-50' : 'hidden'}`}>
                            <span className="font-medium text-blue-700">Grade {selection.name}</span>
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
}

export default AssignTeachers;
