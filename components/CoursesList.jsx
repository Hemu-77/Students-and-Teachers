"use client";

import Link from "next/link";
import React from "react";
import { useData } from "../context/DataContext";

const CourseCard = () => {
  const { courses } = useData();

  return (
    <div className="max-w-7xl justify-center border-2 mx-auto p-6">
      <div className="text-left mb-6">
        <Link href="/">← Back</Link>
      </div>

      <h1 className="text-4xl font-bold text-center mb-8">Courses List</h1>

      <div className="space-y-6">
        {courses.map((course) => (
          <div key={course.id} className="flex border-2 justify-between items-center p-4 rounded-md">
            <div>
              <h2 className="text-2xl font-semibold">{course.name}</h2>
              <p className="text-sm text-gray-600">Course ID: {course.id}</p>
            </div>

            <div>
              <Link href={`/courses/${course.id}`}>
                <button className="bg-amber-500 text-white px-4 py-2 rounded-md">Know More</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseCard;
