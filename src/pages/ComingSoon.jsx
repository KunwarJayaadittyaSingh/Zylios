import Card from '../components/Card'

export default function ComingSoon({ title }) {
  return (
    <Card>
      <h1 className="font-serif text-3xl text-olive">{title}</h1>
      <p className="mt-2 text-black/60">This module is next on the build list.</p>
    </Card>
  )
}