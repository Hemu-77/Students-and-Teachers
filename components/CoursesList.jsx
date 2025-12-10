import courses from "../data/Coursedata";
import student from "../app/teachers/page";
import teacher from "../data/Teachersdata";
import Link from "next/link";

const CourseCard = () => {
    return(
        <div className="max-w-7xl justify-center border-2 mx-auto">
             <div className="max-w-7xl">
                <div className="text-left ml-12 mt-12">
                   <Link href='/'> <p>back</p></Link>
                </div>
                <div className="text-center">
                    <h1 className="text-6xl">Courses List</h1>
                </div>
            </div>

        </div>
    )
}


export default CourseCard