import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import useGrade from '../../hooks/useGrade';
import useStudents from '../../hooks/useStudents';
import useTeacher from '../../hooks/useTeachers';
import Cards from '../Common/Cards';
import { useNavigate } from 'react-router-dom';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AdminDashboard = () => {
  const navigate=useNavigate()


  const grades = useGrade();
  const { students = [] } = useStudents();
  const { teachers = [] } = useTeacher();

  function countStudents() {
    return grades?.map((grade) => {
      return students.filter((s) => s?.grade?.name === grade.label).length;
    }) || [];
  }

  function countTeachers() {
    return grades?.map((grade) => {
    
      return teachers.filter((t) => 
        t.grade.some((g) => g.name === grade.label)
      ).length;
    }) || [];
  }

  function countClass() {
    return grades?.reduce((acc: number, g) => {
      return acc + (g.section?.length || 0);
    }, 0) || 0; 
  }
  
  

  const barData = {
    labels: grades?.map((g) => `Grade ${g.label}`),
    datasets: [
      {
        label: 'Students',
        data: countStudents(),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Teachers',
        data: countTeachers(), 
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: grades?.map((g) => `Grade ${g.label}`),
    datasets: [
      {
        data: countStudents(),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };
  
 
  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-semibold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Cards title='Total Students' data={students.length} handleClick={()=>navigate('manage-students')} />
        <Cards title='Total Teachers' data={teachers.length} handleClick={() => navigate('manage-teachers')} />
        <Cards title='Total Casses' data={countClass()} handleClick={()=>navigate('registrar-page/manage-classes')} />

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Students & Teachers per Class</h2>
          <Bar data={barData} options={{
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Class Distribution</h2>
          <Pie data={pieData} options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'right',
                },
              },
            }} />
        </div>


      </div>
    </div>
  );
};

export default AdminDashboard;
