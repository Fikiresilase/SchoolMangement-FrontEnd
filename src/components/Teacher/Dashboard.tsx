import Schedule from "../Common/Schedule";

const Dashboard = () => {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="mb-8 max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent text-center animate-fade-in">
          Teacher Dashboard
        </h1>
        <p className="text-sm text-gray-500 text-center mt-2">Overview of your teaching schedule</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 max-w-7xl mx-auto">
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg border border-gray-100 transition-all duration-300 transform hover:-translate-y-1">
          <h2 className="text-lg font-semibold text-gray-700 tracking-tight">Classes Taught</h2>
          <p className="text-4xl font-extrabold text-indigo-600 mt-2 animate-pop-in">4</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg border border-gray-100 transition-all duration-300 transform hover:-translate-y-1">
          <h2 className="text-lg font-semibold text-gray-700 tracking-tight">Sections Covered</h2>
          <p className="text-4xl font-extrabold text-indigo-600 mt-2 animate-pop-in">7</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <Schedule teacherId="66fbe6ae5bbf2d8c74209c47" />
      </div>
    </div>
  );
};

export default Dashboard;