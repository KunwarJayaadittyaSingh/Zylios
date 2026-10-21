import { Link } from 'react-router-dom'

const courses = [
  { id: 1, title: 'Mathematics Basics', level: 'Beginner' },
  { id: 2, title: 'Intro to Physics', level: 'Beginner' },
  { id: 3, title: 'Web Development', level: 'Intermediate' },
  { id: 4, title: 'English Grammar', level: 'Beginner' },
]

export default function Courses() {
  return (
    <div className="page">
      <h1>Courses</h1>
      <div className="grid">
        {courses.map((course) => (
          <div className="card" key={course.id}>
            <h3>{course.title}</h3>
            <p>{course.level}</p>
            <Link className="btn" to={`/courses/${course.id}`}>Start</Link>
          </div>
        ))}
      </div>
    </div>
  )
}