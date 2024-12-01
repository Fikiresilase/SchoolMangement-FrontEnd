import {  useContext, useState } from "react";
import ContactModal from "../Common/ContactModal";
import StudentTable from "./StudentTable";
import useStudents from "../../hooks/useStudents";
import useParent from "../../hooks/useParent";
import studentFilter from "../../contexts/studentFilter/studentFilter";


const ContactParents = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const { students} = useContext(studentFilter)
  const { parents } = useParent()
  
  function getParent(id: string) {
    const parent = parents?.find(p => p._id == id)
    return parent
}
 return (
    <div className="relative w-full h-full">
      <ContactModal visible={visible} handleClick={()=>setVisible(false)}   />
      <StudentTable header={['Name','Parent','Phone']} title='Contact Parent'
        handleClick={() => !visible ? setVisible(true) : setVisible(false)} >
        <>
       {students?.length ? (
    students.map((s) => (
      <tr
        key={s._id}
        className="p-2 text-center cursor-pointer"
        onClick={() => setVisible(true)}
      >
        <td className="p-2 text-center">{s.name}</td>
        <td className="p-2 text-center">{getParent(s.parent)?.name}</td>
        <td className="p-2 text-center">{ getParent(s.parent)?.phone }</td>
      </tr>
    ))
  ) : (
    <tr>
      <td className="p-2 text-center" colSpan={3}>
        No students found.
      </td>
    </tr>
  )}</>
</StudentTable>
    </div>
  )
};

export default ContactParents;
