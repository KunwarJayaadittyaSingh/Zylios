import { Link, Outlet } from 'react-router-dom'
import { GraduationCap } from 'lucide-react'
import { useApp } from '../../context/AppContext'

export default function Layout() {
  const { role, setRole, grade, setGrade } = useApp()
  return (
    <div className="min-h-screen font-sans">
      <header className="sticky top-0 z-10 border-b border-black/5 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <Link to="/" className="flex items-center gap-2 font-serif text-2xl font-semibold text-olive">
            <GraduationCap /> Zylios
          </Link>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            {role === 'teacher' && (
              <Link to="/teacher" className="rounded-full bg-olive px-3 py-1.5 text-white">Teacher panel</Link>
            )}
            <select value={grade} onChange={(e) => setGrade(+e.target.value)}
              className="rounded-full border border-black/10 bg-white px-3 py-1.5">
              {[6, 7, 8, 9, 10, 11, 12].map((g) => <option key={g} value={g}>Class {g}</option>)}
            </select>
            <select value={role} onChange={(e) => setRole(e.target.value)}
              className="rounded-full border border-black/10 bg-white px-3 py-1.5">
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6"><Outlet /></main>
    </div>
  )
}