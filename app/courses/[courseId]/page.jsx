
import CourseDetailClient from "./components/CourseDetailClient";

export default async function CoursePage({ params }) {
    const resolved = await params;
    const courseId = resolved.courseId;
  
    return (
      <div className="min-h-screen p-6">
        <CourseDetailClient courseId={courseId} />
      </div>
    );
  }
