import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <p className="eyebrow">Learning, reimagined</p>
          <h1>Learn Smarter, Beautifully</h1>
          <p>
            A calm, personal AI tutor that explains, quizzes, and
            tracks your progress, one lesson at a time.
          </p>
          <div className="row">
            <Link className="btn" to="/tutor">Ask the AI Tutor</Link>
            <Link className="btn secondary" to="/courses">Browse Courses</Link>
          </div>
        </div>
      </section>

      <div className="page">
        <h2>What you can do</h2>
        <div className="grid">
          <div className="card">
            <h3>AI Tutor</h3>
            <p>Ask questions and get clear, patient explanations.</p>
          </div>
          <div className="card">
            <h3>Quizzes</h3>
            <p>Test yourself and see exactly where to improve.</p>
          </div>
          <div className="card">
            <h3>Progress</h3>
            <p>Track what you have learned over time.</p>
          </div>
        </div>
      </div>
    </>
  )
}