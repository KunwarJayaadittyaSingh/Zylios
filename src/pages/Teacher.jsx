import Card from '../components/Card'
import { useApp } from '../context/AppContext'

const submissions = [
  { id: 1, name: 'Aarav Sharma', test: 'Dojo: Arrays', score: 78, warnings: 0 },
  { id: 2, name: 'Simran Kaur', test: 'Dojo: Arrays', score: 85, warnings: 3 },
  { id: 3, name: 'Rohan Verma', test: 'Dojo: Arrays', score: 62, warnings: 1 },
]

export default function Teacher() {
  const { role } = useApp()
  if (role !== 'teacher') return <Card>Switch to Teacher view to access this page.</Card>

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-4xl text-olive">Teacher Panel</h1>
      <Card className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-black/50">
            <tr><th className="p-2">Student</th><th>Test</th><th>Score</th><th>Proctor flags</th><th></th></tr>
          </thead>
          <tbody>
            {submissions.map((s) => (
              <tr key={s.id} className="border-t border-black/5">
                <td className="p-2 font-medium">{s.name}</td>
                <td>{s.test}</td>
                <td>{s.score}</td>
                <td className={s.warnings > 1 ? 'font-semibold text-red-600' : ''}>{s.warnings}</td>
                <td><button className="text-ember">Review</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}