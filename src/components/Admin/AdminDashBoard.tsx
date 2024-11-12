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
import { Grade } from '../../services/grade-service';

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
  function countClasses(grades: Grade[]) {
    
  
}

  const grade = useGrade()
  const { students } = useStudents()
  const { teacher } = useTeacher()
  
  const barData = {
    labels:grade?.map(g=>g.label),
    datasets: [
      {
        label: 'Students',
        data: [30, 25, 40, 35, 50],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Teachers',
        data: [2, 3, 2, 2, 3],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'],
    datasets: [
      {
        data: [1, 1, 1, 1, 1],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  const goodScoresData = {
    labels: ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'],
    datasets: [
      {
        label: 'Good Scores',
        data: [10, 15, 8, 12, 20],
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-semibold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-medium text-gray-700">Total Students</h2>
          <p className="text-4xl font-bold text-blue-600 mt-2">{students.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-medium text-gray-700">Total Teachers</h2>
          <p className="text-4xl font-bold text-purple-600 mt-2">{ teacher ?teacher.length : 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-medium text-gray-700">Total Classes</h2>
          <p className="text-4xl font-bold text-green-600 mt-2">5</p>
        </div>
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

        <div className="bg-white p-6 rounded-lg shadow-md col-span-1 md:col-span-2">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Good Scores in Different Classes</h2>
          <Bar data={goodScoresData} options={{
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
