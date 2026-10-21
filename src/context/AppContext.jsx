import { createContext, useContext, useState } from 'react'

const Ctx = createContext(null)
export const useApp = () => useContext(Ctx)

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
const seed = days.flatMap((day) => [
  { id: `${day}-1`, day, time: '09:00', title: 'Physics', room: 'Room 101' },
  { id: `${day}-2`, day, time: '11:00', title: 'Mathematics', room: 'Room 204' },
  { id: `${day}-3`, day, time: '14:00', title: 'Computer Science Lab', room: 'Lab 2' },
])

export const markersData = [
  { name: 'Attendance', values: [92, 88, 95, 90], unit: '%' },
  { name: 'Professionalism', values: [80, 84, 86, 90], unit: '/100' },
  { name: 'Coding', values: [65, 72, 78, 85], unit: '/100' },
  { name: 'Projects', values: [70, 75, 82, 88], unit: '/100' },
  { name: 'Communication', values: [74, 78, 80, 83], unit: '/100' },
]

export function AppProvider({ children }) {
  const [role, setRole] = useState('student') // 'student' | 'teacher'
  const [grade, setGrade] = useState(11)
  const [schedule, setSchedule] = useState(seed)

  const addClass = (c) => setSchedule((s) => [...s, { ...c, id: crypto.randomUUID() }])
  const updateClass = (id, patch) =>
    setSchedule((s) => s.map((c) => (c.id === id ? { ...c, ...patch } : c)))
  const removeClass = (id) => setSchedule((s) => s.filter((c) => c.id !== id))

  return (
    <Ctx.Provider value={{ role, setRole, grade, setGrade, schedule, addClass, updateClass, removeClass }}>
      {children}
    </Ctx.Provider>
  )
}