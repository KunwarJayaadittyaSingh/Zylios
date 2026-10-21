export default function Card({ className = '', children }) {
  return (
    <div className={`rounded-2xl border border-black/5 bg-white p-5 shadow-sm ${className}`}>
      {children}
    </div>
  )
}