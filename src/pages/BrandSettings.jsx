import { useState } from 'react'
import { useBrand } from '../context/BrandContext'

const fields = [
  ['institutionName', 'Institution name'],
  ['classBatch', 'Class or batch'],
  ['squadId', 'Squad ID'],
  ['degreeProgram', 'Degree program'],
]

export default function BrandSettings() {
  const { brand, updateBrand, uploadLogo } = useBrand()
  const [error, setError] = useState('')

  async function onLogo(e) {
    setError('')
    try {
      await uploadLogo(e.target.files[0])
    } catch (err) {
      setError(err.message)
    }
    e.target.value = ''
  }

  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-concrete/40 bg-cream p-6 text-ink shadow-sm">
      <h1 className="font-display text-3xl font-semibold">Brand settings</h1>

      <div className="mt-6">
        <label htmlFor="logo" className="block text-sm font-medium text-moss">
          Institution logo
        </label>
        <input
          id="logo"
          type="file"
          accept="image/*"
          onChange={onLogo}
          className="mt-2 block w-full text-sm text-ink file:mr-4 file:rounded-lg file:border-0 file:bg-amber file:px-4 file:py-2 file:text-white hover:file:brightness-110"
        />
        {brand.logoUrl && (
          <button
            type="button"
            onClick={() => updateBrand({ logoUrl: '' })}
            className="mt-2 text-sm font-medium text-amber underline"
          >
            Remove logo
          </button>
        )}
        {error && (
          <p role="alert" className="mt-2 text-sm font-medium text-red-700">
            {error}
          </p>
        )}
      </div>

      {fields.map(([key, label]) => (
        <div key={key} className="mt-5">
          <label htmlFor={key} className="block text-sm font-medium text-moss">
            {label}
          </label>
          <input
            id={key}
            value={brand[key] || ''}
            onChange={(e) => updateBrand({ [key]: e.target.value })}
            className="mt-1 w-full rounded-lg border border-concrete bg-paper px-3 py-2 text-ink focus:border-amber"
          />
        </div>
      ))}
    </div>
  )
}