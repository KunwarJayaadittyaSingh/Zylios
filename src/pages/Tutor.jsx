import { useState } from 'react'

export default function Tutor() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hi! I am your AI tutor. What would you like to learn today?' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSend(e) {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { role: 'user', text: input }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    // TODO: replace this fake reply with a call to your backend
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: 'ai', text: `You asked: "${userMessage.text}". Real AI answers will appear here once the backend is connected.` },
      ])
      setLoading(false)
    }, 800)
  }

  return (
    <div className="page">
      <h1>AI Tutor</h1>
      <div className="chat">
        {messages.map((m, i) => (
          <div key={i} className={`bubble ${m.role}`}>{m.text}</div>
        ))}
        {loading && <div className="bubble ai">Thinking...</div>}
      </div>

      <form className="row" onSubmit={handleSend}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything..."
        />
        <button className="btn" type="submit">Send</button>
      </form>
    </div>
  )
}