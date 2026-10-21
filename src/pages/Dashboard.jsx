import { Link } from 'react-router-dom'
import { BookOpen, ShieldCheck, CalendarDays, LifeBuoy, BarChart3, Award, UserCheck, ClipboardList, Info } from 'lucide-react'
import Card from '../components/Card'
import { useApp } from '../context/AppContext'

const modules = [
  { name: 'Livebooks', desc: 'Books & study material', to: '/livebooks', icon: BookOpen },
  { name: 'Dojo', desc: 'Proctored assessments', to: '/dojo', icon: ShieldCheck },
  { name: 'Schedule', desc: 'Timetable & classes', to: '/schedule', icon: CalendarDays },
  { name: 'Support', desc: 'Helpdesk & tickets', to: '/support', icon: LifeBuoy },
  { name: 'Markers', desc: 'Scores & progress', to: '/markers', icon: BarChart3 },
  { name: 'Showcase', desc: 'Badges & certificates', to: '/showcase', icon: Award },
  { name: 'Attendance Hub', desc: 'Daily & monthly logs', to: '/attendance', icon: UserCheck },
  { name: 'Assessment Corner', desc: 'Practice & quizzes', to: '/assessments', icon: ClipboardList },
  { name: 'Info Center', desc: 'Guidelines & policies', to: '/info', icon: Info },
]

export default function Dashboard() {
  const { schedule, grade } = useApp()
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' })
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'
  const myDay = schedule.filter((c) => c.day === today).sort((a, b) => a.time.localeCompare(b.time))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-4xl font-medium text-olive">{greeting}, Student</h1>
        <p className="text-black/60">Class {grade} · Zylios International School</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
        <Card>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-serif text-2xl text-olive">My Day</h2>
            <span className="text-sm text-black/50">{today}</span>
          </div>
          {myDay.length === 0 && <p className="text-sm text-black/50">No classes today.</p>}
          <ul className="space-y-3">
            {myDay.map((c) => (
              <li key={c.id} className="flex gap-3 border-l-2 border-ember pl-3">
                <span className="w-12 text-sm font-medium">{c.time}</span>
                <div>
                  <p className="font-medium">{c.title}</p>
                  <p className="text-xs text-black/50">{c.room}</p>
                </div>
              </li>
            ))}
          </ul>
          <Link to="/schedule" className="mt-4 inline-block text-sm text-ember">View full schedule →</Link>
        </Card>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {modules.map(({ name, desc, to, icon: Icon }) => (
            <Link key={name} to={to}>
              <Card className="h-full transition hover:-translate-y-1 hover:shadow-md">
                <div className="mb-3 grid h-11 w-11 place-items-center rounded-xl bg-leaf/25 text-olive">
                  <Icon size={22} />
                </div>
                <p className="font-medium">{name}</p>
                <p className="text-xs text-black/50">{desc}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}