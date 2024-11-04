
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './components/AppLayout.tsx/AppLayout'
import StudentsMark from './components/Teacher/StudentsMark'
import StudentFilter from './contexts/studentFilter/studentFilter'
import useStudentFilter from './hooks/useStudentFilter'


import { ReactElement, useState } from 'react'
import RouterContext from './contexts/routerContext/routerContexts'
import TeacherPage from './pages/TeacherPage'
import ContactParents from './components/Teacher/ContactParents'
import TeacherProfile from './components/Teacher/TeacherProfile'
import Registrar from './pages/Registrar'
import RegisterStudents from './components/Registrar/RegisterStudents'
import RegisterTeachers from './components/Registrar/RegisterTeachers'
import AssignTeachers from './components/Registrar/AssignTeachers'

function App() {
  const { students, selected, setSelected, grades, sections, courses, error } = useStudentFilter() 
  const [routes,setRoutes]=useState<ReactElement[]>([])
  
  return (
    <>
      <RouterContext.Provider value={{routes,setRoutes}}>
            <StudentFilter.Provider value={{ students,selected, setSelected, grades, sections, courses,error } }>
      <BrowserRouter>
        <Routes>
              <Route path='/' element={<AppLayout />} >
              <Route path='/teacher-page' element={<TeacherPage />} >
                  <Route path='students-mark' element={<StudentsMark />} />
                  <Route path='contact-parent' element={<ContactParents />} />
                  <Route path='teacher-profile' element={<TeacherProfile />} />
                </Route>
                <Route path='/registrar-page' element={<Registrar />} >
                  <Route path='register-students' element={<RegisterStudents />} />
                  <Route path='register-teachers' element={<RegisterTeachers />} />
                  <Route path='assign-teachers' element={<AssignTeachers />} />

              </Route>
                
            </Route>
          
      </Routes>
      </BrowserRouter>
        </StudentFilter.Provider>
        </RouterContext.Provider>
    </>
  )
}

export default App
