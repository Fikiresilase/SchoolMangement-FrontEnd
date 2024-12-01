import { ReactElement, useContext } from 'react'
import Filter from '../Common/Filter'
import studentFilter from '../../contexts/studentFilter/studentFilter'

interface Selected {
    grade: number | null,
    section: string | null,
    course:string | null
  }
interface Props {
  title: string
  header: string[]
  children ?:ReactElement
  handleClick?: () => void
  
}

const StudentTable = ({ title,header,children }: Props) => {

  const {  selected, setSelected, grades, sections, courses } = useContext(studentFilter)

    return (
      <div className="w-full min-h-screen p-4">
           
        <h1 className="text-3xl font-semibold mb-6">{title}</h1>
  
        <div className="flex gap-2 justify-center my-4">
          <Filter defaultOption={'Grade'} data={grades} setSelected={(s) => setSelected({ ...selected, grade: parseInt(s) } as Selected)} />
          <Filter defaultOption={'Section'} data={sections} setSelected={(s) => setSelected({ ...selected, section: s } as Selected)} />
          <Filter defaultOption={'Course'} data={courses} setSelected={(s) => setSelected({ ...selected, course: s } as Selected)} />
        </div>
      
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full table-auto border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              {header.map((h, index) => (
                <th key={index} className="py-3 px-4 text-center text-sm font-semibold text-gray-600 border-b">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {children}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTable;