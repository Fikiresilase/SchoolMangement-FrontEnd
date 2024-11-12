import useSchedule from "../../hooks/useSchedule"
interface Props {
    teacherId ?: string;

}
const Schedule = ({teacherId}:Props) => {
    const schedules = useSchedule(teacherId)
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Weekly Schedule</h2>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-left">
              <th className="p-4 text-center">Day</th>
              <th className="p-4 text-center">Period</th>
              <th className="p-4 text-center">Course</th>
              <th className="p-4 text-center">Grade</th>
              <th className="p-4 text-center">Section</th>
              <th className="p-4 text-center">Room</th>
            </tr>
          </thead>
          <tbody>
                      {schedules?.map((day) => (
                day.day.map(d=>
              <tr key={d.day} className="border-b">
              <td className="p-4 text-center">{d.day}</td>
              <td className="p-4 text-center">{ d.period}</td>
              <td className="p-4 text-center">{d.course}</td>
              <td className="p-4 text-center">{d.grade}</td>
              <td className="p-4 text-center">{d.section}</td>
              <td className="p-4 text-center">{ d.room}</td>
               
              </tr>
            )))}
          </tbody>
        </table>
      </div>
  )
}

export default Schedule
