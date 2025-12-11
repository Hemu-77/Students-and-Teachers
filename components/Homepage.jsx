"use client"

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

import { useData } from "@/context/DataContext";



export default function HomepageAnimated() {

const {courses, students, teachers} = useData()

  const containerRef = useRef(null);
  
  const cardRefs = useRef([]);


  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  useEffect(() => {
    
    if (!containerRef.current) return;

   
    const q = gsap.utils.selector(containerRef.current);
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

   
    const brandEl = q(".brand");
    if (brandEl && brandEl.length) {
      tl.from(brandEl, {
        y: -30,
        opacity: 0,
        duration: 0.8,
        scale: 0.98,
      });
    }

   
    const validCards = cardRefs.current.filter(Boolean);

    if (validCards.length) {
     
      tl.from(
        validCards,
        {
          y: 40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          scale: 0.98,
        },
        "-=" + 0.2
      );

      
      validCards.forEach((card, i) => {
        gsap.to(card, {
          backgroundColor: i % 2 === 0 ? "#f59e0b" : "#f97316", 
          color: i % 2 === 0 ? "#FFFFFF" : "#000000",
          duration: 3 + i * 0.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0.5 + i * 0.1,
        });
      });
    }

  
    return () => {
      tl && tl.kill();
      
      const valid = cardRefs.current.filter(Boolean);
      if (valid.length) gsap.killTweensOf(valid);
    };
  }, []);

  
  const handleEnter = (el) => {
    if (!el) return;
    gsap.to(el, { scale: 1.03, boxShadow: "0 18px 40px rgba(0,0,0,0.18)", duration: 0.28 });
  };
  const handleLeave = (el) => {
    if (!el) return;
    gsap.to(el, { scale: 1, boxShadow: "0 8px 20px rgba(0,0,0,0.12)", duration: 0.28 });
  };

  return (
    <div ref={containerRef} className="max-w-7xl mx-auto p-6">
      <div className="py-20 text-center">
        <h1 className="brand text-6xl font-extrabold">ByteLogik</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
       
        <div
          ref={addToRefs}
          onMouseEnter={(e) => handleEnter(e.currentTarget)}
          onMouseLeave={(e) => handleLeave(e.currentTarget)}
          className="p-10 rounded-3xl bg-amber-600 flex  justify-between items-start cursor-pointer"
        >
          <div>
            <h2 className="text-5xl text-white font-bold">Students</h2>
            <h5 className="text-2xl text-white py-2 ">Total :- {students.length}</h5>
          </div>
          <div>
            <Link href="/students">
              <button className="bg-white p-3 rounded-md text-lg mt-4">Show full students</button>
            </Link>
          </div>
        </div>

        {/* Teachers Card */}
        <div
          ref={addToRefs}
          onMouseEnter={(e) => handleEnter(e.currentTarget)}
          onMouseLeave={(e) => handleLeave(e.currentTarget)}
          className="p-10 rounded-3xl bg-amber-700 flex justify-between items-start cursor-pointer"
        >
          <div>
            <h2 className="text-5xl text-white font-bold">Teachers</h2>
            <h5 className="text-2xl text-white py-2">Total :- {teachers.length}</h5>
          </div>
          <div>
            <Link href="/teachers">
              <button className="bg-white p-3 rounded-md text-lg mt-4">Show full Teachers</button>
            </Link>
          </div>
        </div>

        {/* Courses Card */}
        <div
          ref={addToRefs}
          onMouseEnter={(e) => handleEnter(e.currentTarget)}
          onMouseLeave={(e) => handleLeave(e.currentTarget)}
          className="p-10 rounded-3xl bg-amber-500 flex justify-between cursor-pointer"
        >
          <div>
            <h2 className="text-5xl text-white font-bold">Courses</h2>
            <h5 className="text-2xl text-white py-2">Total :- {courses.length} </h5>
          </div>
          <div>
            <Link href="/courses">
              <button className="bg-white p-3 rounded-md text-lg mt-4">Show all courses</button>
            </Link>
          </div>
        </div>
      </div>

      {/* small footer note */}
      <div className="mt-10 text-sm text-gray-500">
        Tip: Hover a card for a quick lift. 
      </div>
    </div>
  );
}
