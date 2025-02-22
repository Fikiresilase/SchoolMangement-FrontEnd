import { useContext, useState } from "react";
import ContactModal from "../Common/ContactModal";
import StudentTable from "./StudentTable";
import useParent from "../../hooks/parents/useParent";
import studentFilter from "../../contexts/studentFilter/studentFilter";

const ContactParents = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const { students } = useContext(studentFilter);
  const { parents } = useParent();

  function getParent(id: string) {
    return parents?.find((p) => p._id === id);
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <ContactModal visible={visible} handleClick={() => setVisible(false)} />
      <StudentTable
        header={["Name", "Parent", "Phone"]}
        title="Contact Parents"
        handleClick={() => setVisible(!visible)}
      >
        <>
          {students?.length ? (
            students.map((s) => (
              <tr
                key={s._id}
                className="text-center hover:bg-indigo-50 transition-all duration-200 cursor-pointer"
                onClick={() => setVisible(true)}
              >
                <td className="py-3 px-6 text-gray-700">{s.name}</td>
                <td className="py-3 px-6 text-gray-700">{getParent(s.parent)?.name || "N/A"}</td>
                <td className="py-3 px-6 text-gray-700">{getParent(s.parent)?.phone || "N/A"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="py-3 px-6 text-center text-gray-500" colSpan={3}>
                No students found.
              </td>
            </tr>
          )}
        </>
      </StudentTable>
    </div>
  );
};

export default ContactParents;