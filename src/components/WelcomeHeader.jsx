import { useRef, useState } from 'react'
import { Camera } from 'lucide-react'
import { useBrand } from '../context/BrandContext'

export default function WelcomeHeader({ name, editable = false, ...overrides }) {
  const { brand, uploadLogo } = useBrand()
  const [error, setError] = useState('')
  const fileRef = useRef(null)

  const { logoUrl, institutionName, classBatch, squadId, degreeProgram } = {
    ...brand,
    ...overrides,
  }

  const initials = institutionName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('')

  async function onPick(e) {
    setError('')
    try {
      await uploadLogo(e.target.files[0])
    } catch (err) {
      setError(err.message)
    }
    e.target.value = ''
  }

  const details = [classBatch, squadId, degreeProgram].filter(Boolean)

  return (
    <section
      className="relative overflow-hidden rounded-2xl border border-concrete/30 p-6 text-cream shadow-lg md:p-8"
      style={{
        backgroundColor: '#171A33',
        backgroundImage:
          'radial-gradient(at 90% 0%, rgba(232,116,59,0.5) 0px, transparent 50%), radial-gradient(at 0% 100%, rgba(109,91,208,0.45) 0px, transparent 55%)',
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-sage">Welcome back</p>
          <h1 className="mt-1 font-display text-4xl font-semibold leading-tight md:text-5xl">
            Hi {name}
          </h1>
        </div>

        <div className="relative shrink-0">
          <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl bg-paper shadow-md md:h-20 md:w-20">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={`${institutionName} logo`}
                className="h-full w-full object-contain p-1.5"
              />
            ) : (
              <span
                aria-label="Default institution avatar"
                className="flex h-full w-full items-center justify-center bg-sage font-display text-2xl font-semibold text-olive-deep"
              >
                {initials || '?'}
              </span>
            )}
          </div>
          {editable && (
            <>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                aria-label="Change institution logo"
                className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-amber text-white shadow ring-2 ring-olive-deep transition hover:brightness-110"
              >
                <Camera size={16} />
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={onPick}
                className="hidden"
              />
            </>
          )}
        </div>
      </div>

      <p className="mt-6 text-lg font-medium text-cream">{institutionName}</p>
      {details.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-2">
          {details.map((d) => (
            <li
              key={d}
              className="rounded-full bg-cream/10 px-3 py-1 text-sm text-cream ring-1 ring-cream/30"
            >
              {d}
            </li>
          ))}
        </ul>
      )}
      {error && (
        <p role="alert" className="mt-3 text-sm font-medium text-amber-200">
          {error}
        </p>
      )}
    </section>
  )
}