const TeacherProfile = () => {
  return (
    <div className="w-full min-h-screen px-6 py-4 bg-gray-50">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">My Profile</h1>
      
      <div className="flex items-center p-4 border border-gray-300 rounded-lg shadow-sm bg-white">
        <div className="w-16 h-16 bg-gray-400 rounded-full mr-4"></div>
        <div className="flex flex-col">
          <p className="font-bold text-lg text-gray-700">Some Teacher</p>
          <p className="text-sm text-gray-500">Teacher at branch 2</p>
        </div>
      </div>

      <table className="w-full mt-6 border border-gray-300 rounded-lg shadow-sm bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 border-b">Name</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 border-b">Email</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 border-b">Password</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 border-b">Actions</th>
          </tr>
        </thead>
        
        <tbody>
          <tr className="hover:bg-gray-50 transition-colors">
            <td className="py-3 px-4 text-gray-700">Egele</td>
            <td className="py-3 px-4">
              <input
                type="email"
                placeholder="Enter email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </td>
            <td className="py-3 px-4">
              <input
                type="password"
                placeholder="Enter password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </td>
            <td className="py-3 px-4 text-center">
              <button className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200">
                Save Changes
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TeacherProfile;
