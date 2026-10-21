import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="page">
      <h1>404</h1>
      <p>This page does not exist.</p>
      <Link className="btn" to="/">Go Home</Link>
    </div>
  )
}