"use client";

import Link from "next/link";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useData } from "../context/DataContext";

const CourseCard = () => {
  const { courses } = useData();

  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  const addCardRef = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const q = gsap.utils.selector(containerRef.current);

    // Heading animation
    gsap.from(q(".title"), {
      y: -20,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });

    // Cards animation
    gsap.from(cardRefs.current, {
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: "power3.out",
    });

    // Optional: text color pulse
    gsap.to(q(".course-name"), {
      color: "#b45309",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <div ref={containerRef} className="max-w-7xl justify-center border-2 mx-auto p-6">
      <div className="text-left mb-6">
        <Link href="/">← Back</Link>
      </div>

      <h1 className="text-4xl font-bold text-center mb-8 title">Courses List</h1>

      <div className="space-y-6">
        {courses.map((course) => (
          <div
            key={course.id}
            ref={addCardRef}
            className="flex border-2 justify-between items-center p-4 rounded-md"
          >
            <div>
              <h2 className="text-2xl font-semibold course-name">{course.name}</h2>
              <p className="text-sm text-gray-600">Course ID: {course.id}</p>
            </div>

            <div>
              <Link href={`/courses/${course.id}`}>
                <button className="bg-amber-500 text-white px-4 py-2 rounded-md">
                  Know More
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseCard;
