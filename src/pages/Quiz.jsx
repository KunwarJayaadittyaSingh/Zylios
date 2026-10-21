import { useState } from 'react'

const questions = [
  { q: 'What is 7 x 8?', options: ['54', '56', '58', '64'], answer: '56' },
  { q: 'What is the capital of France?', options: ['Berlin', 'Madrid', 'Paris', 'Rome'], answer: 'Paris' },
  { q: 'Which planet is closest to the Sun?', options: ['Venus', 'Earth', 'Mercury', 'Mars'], answer: 'Mercury' },
]

export default function Quiz() {
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState(null)
  const [finished, setFinished] = useState(false)

  function handleAnswer(option) {
    if (selected) return
    setSelected(option)
    if (option === questions[current].answer) setScore((s) => s + 1)
  }

  function handleNext() {
    if (current + 1 < questions.length) {
      setCurrent(current + 1)
      setSelected(null)
    } else {
      setFinished(true)
    }
  }

  function restart() {
    setCurrent(0)
    setScore(0)
    setSelected(null)
    setFinished(false)
  }

  if (finished) {
    return (
      <div className="page">
        <h1>Quiz Complete</h1>
        <p>You scored {score} out of {questions.length}.</p>
        <button className="btn" onClick={restart}>Try Again</button>
      </div>
    )
  }

  const question = questions[current]

  return (
    <div className="page">
      <h1>Quiz</h1>
      <p>Question {current + 1} of {questions.length}</p>
      <h2>{question.q}</h2>

      <div className="options">
        {question.options.map((option) => {
          let className = 'option'
          if (selected) {
            if (option === question.answer) className += ' correct'
            else if (option === selected) className += ' wrong'
          }
          return (
            <button key={option} className={className} onClick={() => handleAnswer(option)}>
              {option}
            </button>
          )
        })}
      </div>

      {selected && (
        <button className="btn" onClick={handleNext}>
          {current + 1 < questions.length ? 'Next' : 'Finish'}
        </button>
      )}
    </div>
  )
}