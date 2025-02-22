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
import useGrade from '../../hooks/classes/useGrade';
import useStudents from '../../hooks/students/useStudents';
import useTeacher from '../../hooks/teacher/useTeachers';
import Cards from '../Common/Cards';
import { useNavigate } from 'react-router-dom';
import { memo } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AdminDashboard = memo(() => {
  const navigate = useNavigate();
  const grades = useGrade();
  const { students = [] } = useStudents();
  const { teachers = [] } = useTeacher();

  const studentCounts = grades?.map((grade) => 
    students.filter((s) => s?.grade?.name === grade.label).length
  ) || [];
  const teacherCounts = grades?.map((grade) => 
    teachers.filter((t) => t.grade.some((g) => g.name === grade.label)).length
  ) || [];
  const totalClasses = grades?.reduce((acc, g) => acc + (g.section?.length || 0), 0) || 0;

  const barData = {
    labels: grades?.map((g) => `Grade ${g.label}`) || [],
    datasets: [
      {
        label: 'Students',
        data: studentCounts,
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75, 192, 192, 0.9)',
        hoverBorderColor: 'rgba(75, 192, 192, 1)',
        borderRadius: 4, // Rounded bars
      },
      {
        label: 'Teachers',
        data: teacherCounts,
        backgroundColor: 'rgba(153, 102, 255, 0.7)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(153, 102, 255, 0.9)',
        hoverBorderColor: 'rgba(153, 102, 255, 1)',
        borderRadius: 4,
      },
    ],
  };

  const pieData = {
    labels: grades?.map((g) => `Grade ${g.label}`) || [],
    datasets: [
      {
        data: studentCounts,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40', // Added for scalability
        ],
        hoverOffset: 10,
        borderWidth: 2,
        borderColor: '#fff',
      },
    ],
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="bg-white p-6 rounded-xl shadow-md mb-8 mx-auto max-w-7xl border border-gray-100">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent text-center mb-4 animate-fade-in">
          Admin Dashboard
        </h1>
        <p className="text-sm text-gray-500 text-center">Real-time School Statistics</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 max-w-7xl mx-auto">
        <Cards
          title="Total Students"
          data={students.length}
          handleClick={() => navigate('manage-students')}
        />
        <Cards
          title="Total Teachers"
          data={teachers.length}
          handleClick={() => navigate('manage-teachers')}
        />
        <Cards
          title="Total Classes"
          data={totalClasses}
          handleClick={() => navigate('manage-classes')}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
            Students & Teachers per Grade
          </h2>
          <div className="h-96">
            <Bar
              data={barData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  title: { display: false },
                  tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.85)',
                    titleFont: { weight: 'bold', size: 14 },
                    bodyFont: { size: 12 },
                    padding: 10,
                    cornerRadius: 4,
                    callbacks: {
                      label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.raw}`,
                    },
                  },
                  legend: {
                    position: 'top',
                    labels: { font: { size: 12 }, padding: 15 },
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: { stepSize: 1, font: { size: 12 } },
                    title: { display: true, text: 'Count', font: { size: 14 } },
                    grid: { color: 'rgba(0, 0, 0, 0.05)' },
                  },
                  x: {
                    ticks: { font: { size: 12 } },
                    grid: { display: false },
                  },
                },
                animation: {
                  duration: 1200,
                  easing: 'easeOutQuart',
                  delay: (context) => context.dataIndex * 100, // Staggered animation
                },
              }}
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
            Student Distribution by Grade
          </h2>
          <div className="h-96">
            <Pie
              data={pieData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  title: { display: false },
                  tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.85)',
                    titleFont: { weight: 'bold', size: 14 },
                    bodyFont: { size: 12 },
                    padding: 10,
                    cornerRadius: 4,
                    callbacks: {
                      label: (tooltipItem) => `Grade ${tooltipItem.label.split(' ')[1]}: ${tooltipItem.raw} Students`,
                    },
                  },
                  legend: {
                    position: 'right',
                    labels: { boxWidth: 15, font: { size: 12 }, padding: 15 },
                  },
                },
                animation: {
                  duration: 1200,
                  easing: 'easeOutQuart',
                  animateRotate: true,
                  animateScale: true, // Adds a scaling effect
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default AdminDashboard;