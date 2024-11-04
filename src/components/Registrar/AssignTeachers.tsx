import { ChangeEvent, useState } from "react";
import useGrade from "../../hooks/useGrade";
import 'bootstrap-icons/font/bootstrap-icons.css';

const AssignTeachers = () => {
    const [selections, setSelections] = useState([
        {
            grade: '',
            section: ['']
        },
    ]);

    const grades = useGrade();

    function handleChange(e: ChangeEvent<HTMLInputElement>, selectedIndex: number) {
        if (e.currentTarget.type === 'checkbox') {
            setSelections(
                selections.map((selection, thisIndex) =>
                    thisIndex === selectedIndex
                        ? {
                            ...selection,
                            section: e.currentTarget.checked
                                ? [...selection.section, e.currentTarget.value]
                                : selection.section.filter(s => s !== e.currentTarget.value)
                        }
                        : selection
                )
            );

            
        }
    
    }

    function handleSubmit() {
        
    }

    return (
        <div className="w-full h-full p-4">
            <div className="flex justify-between">
                <div className="flex flex-col w-[60%]">
                    <form onSubmit={handleSubmit} className="flex flex-col">
                        <div className="flex items-center gap-2 fs-0.5">
                            <input type="search" className="w-[200px] p-2 border border-slate-500" />
                            <i className="bi bi-search block w-12 cursor-pointer"></i>
                        </div>
                        {grades?.map((g) => (
                            <div key={g._id}>
                                <input
                                    type="text"
                                    contentEditable={false}
                                    className="my-2 outline-none"
                                    defaultValue={`Grade ${g.label}`}
                                />
                                <div className="flex gap-2">
                                    {g.section.map((s,index) => (
                                        <input
                                            key={`${g._id}-${s}`}
                                            type="checkbox"
                                            onChange={(e) => handleChange(e, index)}
                                            value={s}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </form>
                </div>
                <div className="w-full px-4">
                    {selections.map((selection, index) => (
                        <div
                            key={index}
                            className="flex justify-center items-center gap-4 p-2 border border-b-slate-500"
                        >
                            <span className="w-full">Grade {selection.grade}</span>
                            {selection.section.map((s, i) => (
                                <span className="w-full" key={i}>
                                    {s}
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AssignTeachers;
