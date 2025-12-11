"use client";

import React, { useMemo, useEffect, useRef } from "react";
import { useData } from "../../../../context/DataContext";
import Link from "next/link";
import gsap from "gsap";

const CourseDetailClient = ({ courseId }) => {
  const {
    courses,
    students,
    teachers,
    assignTeacherToCourse,
    unassignTeacherFromCourse,
    enrollStudentToCourse,
    removeStudentFromCourse,
  } = useData();

  const numericCourseId = useMemo(() => Number(courseId), [courseId]);

  const course = courses.find((c) => c.id === numericCourseId);
  if (!course) {
    return (
      <div>
        <p>Course not found.</p>
        <Link href="/courses">Back to courses</Link>
      </div>
    );
  }

  const assignedTeacher = teachers.find((t) => t.id === course.teacherId) || null;
  const enrolledStudents = course.students
    .map((sid) => students.find((s) => s.id === sid))
    .filter(Boolean);

  // animation container
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const q = gsap.utils.selector(containerRef.current);

    // Heading & top info
    gsap.from(q(".course-heading"), {
      y: -18,
      opacity: 0,
      duration: 0.7,
      ease: "power2.out",
    });

    // Reveal drop zones
    gsap.from(q("[aria-label='Teacher drop zone']"), {
      y: 10,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
    });
    gsap.from(q("[aria-label='Students drop zone']"), {
      y: 10,
      opacity: 0,
      duration: 0.6,
      delay: 0.08,
      ease: "power2.out",
    });

    // Reveal lists on the right
    gsap.from(q(".teacher-item"), {
      y: 20,
      opacity: 0,
      duration: 0.55,
      stagger: 0.06,
      ease: "power3.out",
    });
    gsap.from(q(".student-item"), {
      y: 20,
      opacity: 0,
      duration: 0.55,
      stagger: 0.06,
      delay: 0.08,
      ease: "power3.out",
    });

    // Enrolled students list reveal
    gsap.from(q(".enrolled-item"), {
      y: 12,
      opacity: 0,
      duration: 0.5,
      stagger: 0.06,
      ease: "power3.out",
    });

    // subtle color pulse for course name
    gsap.to(q(".course-name"), {
      color: "#b45309",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // cleanup
    return () => {
      gsap.killTweensOf(q(".course-name"));
      gsap.killTweensOf(q(".teacher-item"));
      gsap.killTweensOf(q(".student-item"));
      gsap.killTweensOf(q(".enrolled-item"));
    };
  }, []);

  // drag/drop handlers
  const onDragStart = (e, payload) => {
    try {
      e.dataTransfer.setData("application/json", JSON.stringify(payload));
      e.dataTransfer.effectAllowed = "move";
    } catch (err) {
      // ignore
    }
  };

  const allowDrop = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const onDropAssignTeacher = (e) => {
    e.preventDefault();
    try {
      const payload = JSON.parse(e.dataTransfer.getData("application/json"));
      if (payload && payload.type === "TEACHER") {
        const teacherId = Number(payload.id);
        assignTeacherToCourse(numericCourseId, teacherId);
      }
    } catch (err) {
      // ignore
    }
  };

  const onDropEnrollStudent = (e) => {
    e.preventDefault();
    try {
      const payload = JSON.parse(e.dataTransfer.getData("application/json"));
      if (payload && payload.type === "STUDENT") {
        const studentId = Number(payload.id);
        enrollStudentToCourse(numericCourseId, studentId);
      }
    } catch (err) {
      // ignore
    }
  };

  // hover interactions for draggable items
  const handleHoverEnter = (el) => {
    if (!el) return;
    gsap.to(el, { scale: 1.02, boxShadow: "0 10px 30px rgba(0,0,0,0.12)", duration: 0.18 });
  };
  const handleHoverLeave = (el) => {
    if (!el) return;
    gsap.to(el, { scale: 1, boxShadow: "0 4px 12px rgba(0,0,0,0.06)", duration: 0.18 });
  };

  return (
    <div ref={containerRef} className="grid grid-cols-3 gap-6">
      <div className="col-span-2 border p-4 rounded">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold course-heading">
              <span className="course-name">{course.name}</span>
            </h1>
            <p className="text-sm text-gray-600">Course ID: {course.id}</p>
          </div>
          <div>
            <Link href="/courses">
              <button className="text-sm underline">Back to courses</button>
            </Link>
          </div>
        </div>

        <div
          onDragOver={allowDrop}
          onDrop={onDropAssignTeacher}
          className="mb-6 p-4 border rounded bg-gray-50"
          aria-label="Teacher drop zone"
        >
          <h2 className="text-xl font-semibold">Assigned Teacher</h2>
          {assignedTeacher ? (
            <div className="flex items-center justify-between mt-2">
              <div>
                <p className="font-medium">{assignedTeacher.name}</p>
                <p className="text-sm text-gray-600">Teacher ID: {assignedTeacher.id}</p>
              </div>
              <div>
                <button
                  className="text-sm px-3 py-1 border rounded"
                  onClick={() => unassignTeacherFromCourse(numericCourseId)}
                >
                  Unassign
                </button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500 mt-2">Drag a teacher here to assign</p>
          )}
        </div>

        <div
          onDragOver={allowDrop}
          onDrop={onDropEnrollStudent}
          className="p-4 border rounded bg-gray-50"
          aria-label="Students drop zone"
        >
          <h2 className="text-xl font-semibold mb-2">
            Enrolled Students ({enrolledStudents.length})
          </h2>

          {enrolledStudents.length === 0 ? (
            <p className="text-sm text-gray-500">No students enrolled. Drag students here to enroll.</p>
          ) : (
            <ul className="space-y-2">
              {enrolledStudents.map((s) => (
                <li
                  key={s.id}
                  className="flex items-center justify-between p-2 border rounded bg-white enrolled-item"
                >
                  <div>
                    <p className="font-medium">{s.name}</p>
                    <p className="text-sm text-gray-600">ID: {s.id}</p>
                  </div>
                  <div>
                    <button
                      className="text-sm px-2 py-1 border rounded"
                      onClick={() => removeStudentFromCourse(numericCourseId, s.id)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="border p-4 rounded">
        <h3 className="text-lg font-semibold mb-3">All Teachers</h3>
        <div className="space-y-2 mb-6">
          {teachers.map((t) => (
            <div
              key={t.id}
              draggable
              onDragStart={(e) => onDragStart(e, { type: "TEACHER", id: t.id })}
              onMouseEnter={(e) => handleHoverEnter(e.currentTarget)}
              onMouseLeave={(e) => handleHoverLeave(e.currentTarget)}
              className="p-2 border rounded bg-white cursor-grab teacher-item"
            >
              <p className="font-medium">{t.name}</p>
              <p className="text-xs text-gray-500">ID: {t.id}</p>
            </div>
          ))}
        </div>

        <h3 className="text-lg font-semibold mb-3">All Students</h3>
        <div className="space-y-2">
          {students.map((s) => (
            <div
              key={s.id}
              draggable
              onDragStart={(e) => onDragStart(e, { type: "STUDENT", id: s.id })}
              onMouseEnter={(e) => handleHoverEnter(e.currentTarget)}
              onMouseLeave={(e) => handleHoverLeave(e.currentTarget)}
              className="p-2 border rounded bg-white cursor-grab student-item"
            >
              <p className="font-medium">{s.name}</p>
              <p className="text-xs text-gray-500">ID: {s.id}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetailClient;
