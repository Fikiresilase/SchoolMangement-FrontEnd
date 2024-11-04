import { ReactElement, useContext } from 'react'
import Filter from '../Common/Filter'
import StudentFilter from '../../contexts/studentFilter/studentFilter'

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

  const {  selected, setSelected, grades, sections, courses } = useContext(StudentFilter)

    return (
      <div className="w-full min-h-screen p-4">
           
        <h1>{title}</h1>
  
        <div className="flex gap-2 justify-center my-4">
          <Filter defaultOption={'Grade'} data={grades} setSelected={(s) => setSelected({ ...selected, grade: parseInt(s) } as Selected)} />
          <Filter defaultOption={'Section'} data={sections} setSelected={(s) => setSelected({ ...selected, section: s } as Selected)} />
          <Filter defaultOption={'Course'} data={courses} setSelected={(s) => setSelected({ ...selected, course: s } as Selected)} />
        </div>
      
  
        <table className="table table-striped table-bordered ">
          <thead>
            <tr className="p-2 text-center">
              {header.map((h, index) =>
                <th key={index} className="p-2 text-center">{h}</th>)
              }
            </tr>
          </thead>
          <tbody>
            
            {children}
              
          </tbody>
       
        </table>
      </div>
    )
  }


export default StudentTable
