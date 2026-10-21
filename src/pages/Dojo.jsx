import { useEffect, useRef, useState } from 'react'
import { AlertTriangle, Bot, Video } from 'lucide-react'
import Card from '../components/Card'
import { askAI } from '../services/aiService'

export default function Dojo() {
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const [started, setStarted] = useState(false)
  const [error, setError] = useState('')
  const [warnings, setWarnings] = useState([])
  const [code, setCode] = useState('// Reverse a string\nfunction reverse(s) {\n  \n}')
  const [chat, setChat] = useState([{ from: 'ai', text: 'Stuck? Ask me for a hint or help with an error.' }])
  const [q, setQ] = useState('')

  async function start() {
    try {
      streamRef.current = await navigator.mediaDevices.getUserMedia({ video: true })
      setStarted(true)
    } catch {
      setError('Camera access is required to start the test.')
    }
  }

  function finish() {
    streamRef.current?.getTracks().forEach((t) => t.stop())
    setStarted(false)
  }

  useEffect(() => {
    if (started && videoRef.current) videoRef.current.srcObject = streamRef.current
  }, [started])

  useEffect(() => {
    if (!started) return
    const warn = (msg) => setWarnings((w) => [...w, { msg, time: new Date().toLocaleTimeString() }])
    const onVis = () => document.hidden && warn('Tab switched')
    const onBlur = () => warn('Left the test window')
    document.addEventListener('visibilitychange', onVis)
    window.addEventListener('blur', onBlur)
    return () => {
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('blur', onBlur)
    }
  }, [started])

  useEffect(() => () => streamRef.current?.getTracks().forEach((t) => t.stop()), [])

  async function ask(e) {
    e.preventDefault()
    if (!q.trim()) return
    const question = q
    setChat((c) => [...c, { from: 'user', text: question }])
    setQ('')
    const reply = await askAI(question, code)
    setChat((c) => [...c, { from: 'ai', text: reply }])
  }

  if (!started) {
    return (
      <Card className="mx-auto max-w-lg text-center">
        <Video className="mx-auto mb-3 text-olive" size={36} />
        <h1 className="font-serif text-3xl text-olive">Dojo Assessment</h1>
        <p className="my-3 text-black/60">
          This test is proctored. Your webcam stays on, and tab switches are logged and reported to your teacher.
        </p>
        {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
        <button onClick={start} className="rounded-full bg-ember px-6 py-2.5 text-white">Allow camera & start</button>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {warnings.length > 0 && (
        <div className="flex items-center gap-2 rounded-xl border border-red-300 bg-red-50 p-3 text-red-900">
          <AlertTriangle size={18} />
          <span className="text-sm">
            Warning {warnings.length}: {warnings.at(-1).msg} at {warnings.at(-1).time}. Repeated violations are reported.
          </span>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <Card>
          <div className="mb-2 flex items-center justify-between">
            <h1 className="font-serif text-2xl text-olive">Question 1</h1>
            <button onClick={finish} className="rounded-full bg-olive px-4 py-1.5 text-sm text-white">Submit & end</button>
          </div>
          <textarea value={code} onChange={(e) => setCode(e.target.value)} spellCheck="false"
            className="h-72 w-full rounded-xl bg-[#1f241a] p-4 font-mono text-sm text-green-100" />
        </Card>

        <div className="space-y-4">
          <Card className="p-2">
            <video ref={videoRef} autoPlay muted playsInline className="w-full rounded-xl" />
            <p className="mt-1 text-center text-xs text-red-600">● Proctoring live</p>
          </Card>

          <Card>
            <h2 className="mb-2 flex items-center gap-2 font-medium"><Bot size={18} /> AI Assistant</h2>
            <div className="mb-2 max-h-40 space-y-2 overflow-y-auto text-sm">
              {chat.map((m, i) => (
                <p key={i} className={m.from === 'user' ? 'text-right text-olive' : 'rounded-lg bg-leaf/20 p-2'}>{m.text}</p>
              ))}
            </div>
            <form onSubmit={ask} className="flex gap-2">
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ask for a hint..."
                className="min-w-0 flex-1 rounded-lg border border-black/10 px-2 py-1.5 text-sm" />
              <button className="rounded-lg bg-ember px-3 text-sm text-white">Ask</button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}