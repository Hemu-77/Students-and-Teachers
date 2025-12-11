"use client";

import React, { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [students, setStudents] = useState([
    { id: 1, name: "Asha", courses: [1, 2], year: "2nd", status: "active" },
    { id: 2, name: "Joy", courses: [2], year: "1st", status: "active" },
    { id: 3, name: "Sai", courses: [2, 3], year: "1st", status: "active" },
    { id: 4, name: "Hope", courses: [1, 3], year: "1st", status: "active" },
    { id: 5, name: "Tom", courses: [1], year: "2nd", status: "active" },
    { id: 6, name: "Bart", courses: [2], year: "1st", status: "active" },
    { id: 7, name: "John", courses: [3], year: "2nd", status: "active" },
    { id: 8, name: "Mary", courses: [1, 2, 3], year: "2nd", status: "active" },
  ]);

  const [teachers, setTeachers] = useState([
    { id: 1, name: "Vishnu", courses: [1] },
    { id: 2, name: "James", courses: [3] },
    { id: 3, name: "Pope", courses: [2] },
    { id: 4, name: "Edwards", courses: [4] },
  ]);

  const [courses, setCourses] = useState([
    { id: 1, name: "React Basics", teacherId: 1, students: [1] },
    { id: 2, name: "Next.js Advanced", teacherId: 3, students: [1, 2] },
    { id: 3, name: "Node.js Fundamentals", teacherId: 2, students: [] },
    { id: 4, name: "Mongo DB Fundamentals", teacherId: 4, students: [] },
  ]);

  
  const addUnique = (arr, item) => (arr.includes(item) ? arr : [...arr, item]);
  const removeItem = (arr, item) => arr.filter((x) => x !== item);

 
  const assignTeacherToCourse = (courseId, teacherId) => {
    setCourses((prevCourses) =>
      prevCourses.map((c) =>
        c.id === courseId ? { ...c, teacherId } : c
      )
    );

    setTeachers((prevTeachers) => {
      
      const cleaned = prevTeachers.map((t) =>
        t.courses.includes(courseId) ? { ...t, courses: removeItem(t.courses, courseId) } : t
      );

      
      return cleaned.map((t) =>
        t.id === teacherId ? { ...t, courses: addUnique(t.courses, courseId) } : t
      );
    });
  };

  
  const unassignTeacherFromCourse = (courseId) => {
    setCourses((prevCourses) =>
      prevCourses.map((c) => (c.id === courseId ? { ...c, teacherId: null } : c))
    );

    setTeachers((prevTeachers) =>
      prevTeachers.map((t) =>
        t.courses.includes(courseId) ? { ...t, courses: removeItem(t.courses, courseId) } : t
      )
    );
  };

  
  const enrollStudentToCourse = (courseId, studentId) => {
    setCourses((prevCourses) =>
      prevCourses.map((c) =>
        c.id === courseId ? { ...c, students: addUnique(c.students, studentId) } : c
      )
    );

    setStudents((prevStudents) =>
      prevStudents.map((s) =>
        s.id === studentId ? { ...s, courses: addUnique(s.courses, courseId) } : s
      )
    );
  };

  
  const removeStudentFromCourse = (courseId, studentId) => {
    setCourses((prevCourses) =>
      prevCourses.map((c) =>
        c.id === courseId ? { ...c, students: removeItem(c.students, studentId) } : c
      )
    );

    setStudents((prevStudents) =>
      prevStudents.map((s) =>
        s.id === studentId ? { ...s, courses: removeItem(s.courses, courseId) } : s
      )
    );
  };

  return (
    <DataContext.Provider
      value={{
        students,
        teachers,
        courses,
        
        assignTeacherToCourse,
        unassignTeacherFromCourse,
        enrollStudentToCourse,
        removeStudentFromCourse,
        
        setCourses,
        setStudents,
        setTeachers,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
