
import * as Imports from "./index" ; 

const ProtectedRoute = ({ element, allowedRoles }: { element: Imports.ReactElement; allowedRoles: string[] }) => {
  const user = JSON.parse(localStorage.getItem('user') as string);
  return user && allowedRoles.includes(user.role) ? element : <Imports.Navigate to="/" replace />;
};

function App() {
  const { students, selected, setSelected, grades, sections, courses, error } = Imports.useStudentFilter();
  const [routes, setRoutes] = Imports.useState<Imports.ReactElement[]>([]);

  return (
    <Imports.RouterContext.Provider value={{ routes, setRoutes }}>
      <Imports.StudentFilter.Provider value={{ students, selected, setSelected, grades, sections, courses, error }}>
        <Imports.BrowserRouter>
          <Imports.Routes>
            <Imports.Route path="/" element={<Imports.HomePage />} />
            <Imports.Route element={<Imports.AppLayout />}>
              <Imports.Route
                path="/teacher-page"
                element={<ProtectedRoute element={<Imports.TeacherPage />} allowedRoles={["teacher"]} />}
              >
                <Imports.Route index element={<Imports.Dashboard />} />
                <Imports.Route path="students-mark" element={<Imports.StudentsMark />} />
                <Imports.Route path="contact-parent" element={<Imports.ContactParents />} />
                <Imports.Route path="teacher-profile" element={<Imports.TeacherProfile />} />
              </Imports.Route>

              <Imports.Route path="/registrar-page" element={<Imports.Registrar />}>
                <Imports.Route index element={<Imports.AdminDashboard />} />
                <Imports.Route path="register-students" element={<Imports.RegisterStudents />} />
                <Imports.Route path="register-teachers" element={<Imports.RegisterTeachers />} />
                <Imports.Route path="assign-teachers" element={<Imports.AssignTeachers />} />
                <Imports.Route path="manage-students" element={<Imports.StudentManage />} />
                <Imports.Route path="manage-teachers" element={<Imports.TeacherManage />} />
                <Imports.Route path="manage-classes" element={<Imports.ManageGrade />} />
                <Imports.Route path="assign-courses" element={<Imports.AssignCourses />} />
              </Imports.Route>

              <Imports.Route
                path="/admin-page"
                element={<ProtectedRoute element={<Imports.AdminPage />} allowedRoles={["admin"]} />}
              >
                <Imports.Route index element={<Imports.AdminDashboard />} />
                <Imports.Route path="admin" element={<Imports.RegisterStudents />} />
              </Imports.Route>
            </Imports.Route>
          </Imports.Routes>
        </Imports.BrowserRouter>
      </Imports.StudentFilter.Provider>
    </Imports.RouterContext.Provider>
  );
}

export default App;