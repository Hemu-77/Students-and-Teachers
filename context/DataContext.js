"use client"

import { createContext, useContext, useState } from "react";

const dataContext = createContext()

export const dataProvider = ({ children }) => {

    const [students, setStudent] = useState([
        {
            id: 1,
            name: "Asha",
            
            courses: [1,2],
            year: "2nd",
            status: "active"
          },
          {
            id: 2,
            name: "Joy",
            
            courses: [2],
            year: "1st",
            status: "active"
          },
          {
            id: 3,
            name: "Sai",
            courses: [2,3],
            year: "1st",
            status: "active"
          },
          {
            id: 4,
            name: "Hope",
            
            courses: [1,3],
            year: "1st",
            status: "active"
          },
          {
            id: 5,
            name: "Tom",
            
            courses: [1],
            year: "2nd",
            status: "active"
          },
          {
            id: 6,
            name: "Bart",
           
            courses: [2],
            year: "1st",
            status: "active"
          },
          {
            id: 7,
            name: "John",
            
            courses: [3],
            year: "2nd",
            status: "active"
          },
          {
            id: 8,
            name: "Mary",
            
            courses: [1,2,3],
            year: "2nd",
            status: "active"
          },
          
    ])

    
}