import apiClient from "./api-client";

interface UserCredentials {
  name?: string;
  email: string;
  password: string;
  role?: string;
  parentName?: string;
  parentEmail?: string;
  parentPassword?: string;
  studentName?: string;
  studentSection?: string;
  studentGrade?: string;
  teacherName?: string;
  teacherEmail?: string;
  teacherPassword?: string;
  teacherSubject?: string;
}

export const registerUser = async ({
  studentName,
  email,
  password,
  studentSection,
  studentGrade,
  parentName,
  parentEmail,
  parentPassword,
  name,
  role,
}: UserCredentials) => {
  let payload = {};

  if (role === "student") {
    payload = {
      student: {
        studentName,
        studentEmail: email,
        studentPassword: password,
        studentRole: "student",
        section: studentSection,
        grade: studentGrade,
      },
      parent: {
        parentName,
        parentEmail,
        parentPassword,
        parentRole: "parent",
      },
    };
  } else if (role === "teacher") {
    payload = {
      teacher: {
        teacherName:name,
        teacherEmail: email,
        teacherPassword: password,
        role: "teacher",
      },
    };
  }

  const response = await apiClient.post('register/register', payload);
  return response.data;
};
