import Card from '../components/Card'
import { markersData } from '../context/AppContext'

const months = ['Jul', 'Aug', 'Sep', 'Oct']

export default function Markers() {
  return (
    <div className="space-y-6">
      <h1 className="font-serif text-4xl text-olive">Markers</h1>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {markersData.map((m) => (
          <Card key={m.name}>
            <div className="mb-3 flex items-end justify-between">
              <h2 className="font-medium">{m.name}</h2>
              <span className="font-serif text-3xl text-ember">{m.values.at(-1)}<span className="text-sm text-black/40">{m.unit}</span></span>
            </div>
            <div className="flex h-24 items-end gap-3">
              {m.values.map((v, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-1">
                  <div className="w-full rounded-t-md bg-leaf" style={{ height: `${v}%` }} />
                  <span className="text-xs text-black/50">{months[i]}</span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}