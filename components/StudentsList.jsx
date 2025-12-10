import students from "../data/Studentsdata";
import courses from "../data/Coursedata";
import Link from "next/link";

const StudentList = () => {
    
    return (
        <div className="max-w-7xl justify-center border-2 mx-auto">
            <div className="max-w-7xl">
                <div className="text-left ml-12 mt-12">
                   <Link href='/'> <p>back</p></Link>
                </div>
                <div className="text-center">
                    <h1 className="text-6xl">Students List</h1>
                </div>
            </div>

            <div className="flex-3 mt-12">
                {students.map(stu => {
                    const studentCourses = stu.courses.map(courseId => {
                        const course = courses.find(c => c.id === courseId)
                        return course ? course.name : "Unknown"
                    })
                    return (
                        <div key={stu.id} className="flex border-2 justify-between items-center mx-8 px-4 my-12 py-4">
                           <div> 
                            <h1 className="text-4xl">{stu.name}</h1>
                            <p className="text-2xl bg-amber-900 mt-4">{studentCourses.join(", ")}</p>
                            </div>
                            <div>
                                <h3 className="text-3xl mb-4">{stu.year}</h3>
                            <h5 className="bg-green-400 px-2 py-2 rounded-3xl text-xl">{stu.status}</h5>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default StudentList
