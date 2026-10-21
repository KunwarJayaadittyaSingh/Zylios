import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import Card from '../components/Card'
import { useApp } from '../context/AppContext'

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

export default function Schedule() {
  const { role, schedule, addClass, updateClass, removeClass } = useApp()
  const [form, setForm] = useState({ title: '', day: 'Monday', time: '09:00', room: '' })
  const canEdit = role === 'teacher'

  function submit(e) {
    e.preventDefault()
    if (!form.title.trim()) return
    addClass(form)
    setForm({ ...form, title: '', room: '' })
  }

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-4xl text-olive">Schedule</h1>

      {canEdit && (
        <Card>
          <form onSubmit={submit} className="flex flex-wrap gap-2">
            <input className="min-w-40 flex-1 rounded-lg border border-black/10 px-3 py-2" placeholder="Class title"
              value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <input className="w-32 rounded-lg border border-black/10 px-3 py-2" placeholder="Room"
              value={form.room} onChange={(e) => setForm({ ...form, room: e.target.value })} />
            <select className="rounded-lg border border-black/10 px-3 py-2" value={form.day}
              onChange={(e) => setForm({ ...form, day: e.target.value })}>
              {days.map((d) => <option key={d}>{d}</option>)}
            </select>
            <input type="time" className="rounded-lg border border-black/10 px-3 py-2" value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })} />
            <button className="rounded-lg bg-ember px-4 py-2 text-white">Add class</button>
          </form>
        </Card>
      )}
      {!canEdit && <p className="text-sm text-black/50">Switch to Teacher (top right) to edit the schedule.</p>}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {days.map((day) => (
          <Card key={day}>
            <h2 className="mb-3 font-serif text-xl text-olive">{day}</h2>
            <ul className="space-y-3">
              {schedule.filter((c) => c.day === day).sort((a, b) => a.time.localeCompare(b.time)).map((c) => (
                <li key={c.id} className="rounded-xl bg-leaf/15 p-3 text-sm">
                  <p className="font-medium">{c.title}</p>
                  <p className="text-xs text-black/50">{c.room}</p>
                  {canEdit ? (
                    <div className="mt-2 flex items-center gap-2">
                      <input type="time" value={c.time} onChange={(e) => updateClass(c.id, { time: e.target.value })}
                        className="rounded border border-black/10 px-1 py-0.5 text-xs" />
                      <select value={c.day} onChange={(e) => updateClass(c.id, { day: e.target.value })}
                        className="rounded border border-black/10 px-1 py-0.5 text-xs">
                        {days.map((d) => <option key={d}>{d}</option>)}
                      </select>
                      <button onClick={() => removeClass(c.id)} className="ml-auto text-ember"><Trash2 size={15} /></button>
                    </div>
                  ) : (
                    <p className="mt-1 text-xs">{c.time}</p>
                  )}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  )
}