// Your backend should hold the API key. Point this at your own endpoint later.
export async function askAI(question, code) {
  try {
    const res = await fetch('/api/hint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, code }),
    })
    if (!res.ok) throw new Error('no backend')
    return (await res.json()).reply
  } catch {
    return 'Backend not connected yet. Hint: break the problem into steps, and try a loop over the string from the end.'
  }
}