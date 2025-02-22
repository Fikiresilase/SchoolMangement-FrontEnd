// index.ts

// React and React Router imports
export { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
export { useState, type ReactElement } from "react";

// Redux imports
export { useSelector } from "react-redux";
export type { RootState } from "./redux/store";

// Custom components
export { default as AppLayout } from "./components/AppLayout.tsx/AppLayout";
export { default as StudentsMark } from "./components/Teacher/StudentsMark";
export { default as StudentFilter } from "./contexts/studentFilter/studentFilter";
export { default as useStudentFilter } from "./hooks/students/useStudentFilter";
export { default as RouterContext } from "./contexts/routerContext/routerContexts";
export { default as TeacherPage } from "./pages/TeacherPage";
export { default as ContactParents } from "./components/Teacher/ContactParents";
export { default as TeacherProfile } from "./components/Teacher/TeacherProfile";
export { default as Registrar } from "./pages/Registrar";
export { default as RegisterStudents } from "./components/Registrar/RegisterStudents";
export { default as RegisterTeachers } from "./components/Registrar/RegisterTeachers";
export { default as AssignTeachers } from "./components/Registrar/AssignTeachers";
export { default as Dashboard } from "./components/Teacher/Dashboard";
export { default as AdminDashboard } from "./components/Admin/AdminDashBoard";
export { default as AdminPage } from "./pages/AdminPage";
export { default as StudentManage } from "./components/Registrar/StudentManage";
export { default as TeacherManage } from "./components/Registrar/TeacherManage";
export { default as HomePage } from "./pages/HomePage";
export { default as AssignCourses } from "./components/Registrar/AssignCourses";
export { default as ManageGrade } from "./components/Registrar/ManageGrade";