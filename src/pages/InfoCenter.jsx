import { ShieldAlert } from 'lucide-react'
import Card from '../components/Card'
import { useApp } from '../context/AppContext'
import { guidelines, commonRule } from '../data/guidelines'

export default function InfoCenter() {
  const { grade, setGrade } = useApp()
  return (
    <div className="space-y-6">
      <h1 className="font-serif text-4xl text-olive">Info Center</h1>

      <div className="flex flex-wrap gap-2">
        {Object.keys(guidelines).map((g) => (
          <button key={g} onClick={() => setGrade(+g)}
            className={`rounded-full px-4 py-1.5 text-sm ${grade === +g ? 'bg-olive text-white' : 'bg-white border border-black/10'}`}>
            Class {g}
          </button>
        ))}
      </div>

      <div className="flex gap-3 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-900">
        <ShieldAlert className="shrink-0" />
        <div>
          <p className="font-semibold">Zero tolerance for cheating (all classes)</p>
          <p className="text-sm">{commonRule}</p>
        </div>
      </div>

      <Card>
        <h2 className="mb-3 font-serif text-2xl text-olive">Class {grade} guidelines</h2>
        <ul className="list-disc space-y-2 pl-5">
          {guidelines[grade].map((rule) => <li key={rule}>{rule}</li>)}
        </ul>
      </Card>
    </div>
  )
}