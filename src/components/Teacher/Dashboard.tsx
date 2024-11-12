import Schedule from "../Common/Schedulet";
const Dashboard = () => {
   
    


  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-semibold mb-6">Teacher Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-medium text-gray-700">Classes Taught</h2>
          <p className="text-4xl font-bold text-blue-600 mt-2">4</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-medium text-gray-700">Sections Covered</h2>
          <p className="text-4xl font-bold text-green-600 mt-2">7</p>
        </div>
      </div>
      <Schedule teacherId="66fbe6ae5bbf2d8c74209c47"/>
    
      
    </div>
  );
};

export default Dashboard;
