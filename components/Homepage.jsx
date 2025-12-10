import students from "../data/Studentsdata";
import courses from "../data/Coursedata";
import Link from "next/link";


const Homepage = () => {
    return(
        <div className="max-w-7xl mx-auto ">
        <div className ="py-24">
            <div className="text-7xl text-center text-black-200">
                <h1>ByteLogik</h1>
            </div>
        </div>
        <div>
            <div className="bg-amber-800 flex justify-between items-center px-12 py-8 rounded-3xl">
                <div>
                <h2 className="text-6xl text-white">Students</h2>
                <h5 className="text-4xl text-white py-2">Total :- {students.length}</h5>
                </div>
                <div>
                <Link href="/students"><button className="bg-white p-4 text-xl">Show full students</button></Link>
                </div>
            </div>
            <div className="bg-amber-800 flex justify-between items-center px-12 py-8 my-8 rounded-3xl">
                <div>
                <h2 className="text-6xl text-white">Teachers</h2>
                <h5 className="text-4xl text-white py-2">Total :- 5</h5>
                </div>
                <div>
               <Link href='/teachers'> <button className="bg-white p-4 text-xl">Show full Teachers</button></Link>
                </div>
            </div>
            <div className="bg-amber-800 flex justify-between items-center px-12 py-8 rounded-3xl">
                <div>
                <h2 className="text-6xl text-white">Courses</h2>
                <h5 className="text-4xl text-white py-2">Total :- {courses.length}</h5>
                </div>
                <div>
                <Link href='/courses'><button className="bg-white p-4 text-xl">Show all courses</button></Link>
                </div>
            </div>

        

        </div>
        </div>
    )
}


export default Homepage;