import teacher from "../data/Teachersdata"
import courses from "../data/Coursedata"
import Link from "next/link"


const TeachersList = () => {
    
    return (
        <div className="max-w-7xl justify-center border-2 mx-auto">
            <div className="max-w-7xl">
                <div className="text-left ml-12 mt-12">
                   <Link href='/'> <p>back</p></Link>
                </div>
                <div className="text-center">
                    <h1 className="text-6xl">Teacher's List</h1>
                </div>
            </div>

            <div className="flex-3 mt-12">
                {teacher.map(stu => {
                    const teacherCourses = stu.courses.map(courseId => {
                        const course = courses.find(c => c.id === courseId)
                        return course ? course.name : "Unknown"
                    })
                    return (
                        <div key={stu.id} className="flex border-2 justify-between items-center mx-8 px-4 my-12 py-4">
                           <div> 
                            <h1 className="text-4xl">{stu.name}</h1>
                            <p className="text-2xl bg-amber-900 mt-4">{teacherCourses.join(", ")}</p>
                            </div>
                           
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default TeachersList