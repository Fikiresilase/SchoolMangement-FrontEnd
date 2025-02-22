import { ReactElement, useContext } from "react";
import Filter from "../Common/Filter";
import studentFilter from "../../contexts/studentFilter/studentFilter";

interface Selected {
  grade: number | null;
  section: string | null;
  course: string | null;
}

interface Props {
  title: string;
  header: string[];
  children?: ReactElement;
  handleClick?: () => void;
}

const StudentTable = ({ title, header, children }: Props) => {
  const { selected, setSelected, grades, sections, courses } = useContext(studentFilter);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="mb-8 max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent text-center animate-fade-in">
          {title}
        </h1>
        <p className="text-sm text-gray-500 text-center mt-2">Filter and manage student data</p>
      </header>

      <div className="flex gap-4 justify-center my-6 max-w-7xl mx-auto">
        <Filter
          defaultOption="Grade"
          data={grades}
          setSelected={(s) => setSelected({ ...selected, grade: parseInt(s) } as Selected)}
        />
        <Filter
          defaultOption="Section"
          data={sections}
          setSelected={(s) => setSelected({ ...selected, section: s } as Selected)}
        />
        <Filter
          defaultOption="Course"
          data={courses}
          setSelected={(s) => setSelected({ ...selected, course: s } as Selected)}
        />
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-xl border border-gray-100 max-w-7xl mx-auto">
        <table className="w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              {header.map((h, index) => (
                <th
                  key={index}
                  className="py-3 px-6 text-center text-sm font-semibold text-gray-700 border-b"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">{children}</tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTable;