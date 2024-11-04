import { useContext, useState } from "react";
import ContactModal from "../Common/ContactModal";
import StudentTable from "./StudentTable";
import StudentFilter from "../../contexts/studentFilter/studentFilter";
const ContactParents = () => {
  const [visible,setVisible] = useState<boolean>(false)
  const { students} = useContext(StudentFilter)
  return (
    <div className="relative w-full h-full">
      <ContactModal visible={visible} handleClick={()=>setVisible(false)}   />
      <StudentTable header={['Name','Parent','Phone']} title='Contact Parent'
        handleClick={() => !visible ? setVisible(true) : setVisible(false)} >
          <>
      {students.map((s) => (
              <tr key={s._id} className="p-2 text-center cursor-pointer" onClick={()=>setVisible(true)} >
                <td className="p-2 text-center">{s.name}</td>
                <td className="p-2 text-center">{}</td>
                <td className="p-2 text-center">{}</td>
           
                
              </tr>
    
      ))
     
      } </>
        
        </StudentTable>
    </div>
  )
};

export default ContactParents;
