/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react'

const BrandContext = createContext(null)

export const useBrand = () => {
  const context = useContext(BrandContext)
  if (!context) {
    throw new Error('useBrand must be used within a BrandProvider')
  }
  return context
}

const defaultBrand = {
  institutionName: 'Kalvium',
  classBatch: 'Batch 2026',
  squadId: 'Squad 42',
  degreeProgram: 'B.Tech Software Engineering',
  logoUrl: '',
}

export function BrandProvider({ children }) {
  const [brand, setBrand] = useState(() => {
    try {
      const saved = localStorage.getItem('zylios_brand')
      if (saved) {
        return { ...defaultBrand, ...JSON.parse(saved) }
      }
    } catch {
      // fallback
    }
    return defaultBrand
  })

  const updateBrand = (patch) => {
    setBrand((prev) => {
      const updated = { ...prev, ...patch }
      try {
        localStorage.setItem('zylios_brand', JSON.stringify(updated))
      } catch {
        // storage quota exceeded or disabled
      }
      return updated
    })
  }

  const uploadLogo = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject(new Error('No file selected'))
        return
      }
      if (!file.type.startsWith('image/')) {
        reject(new Error('Please upload an image file'))
        return
      }
      if (file.size > 5 * 1024 * 1024) {
        reject(new Error('Image must be smaller than 5MB'))
        return
      }
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target.result
        updateBrand({ logoUrl: result })
        resolve(result)
      }
      reader.onerror = () => {
        reject(new Error('Failed to read image file'))
      }
      reader.readAsDataURL(file)
    })
  }

  return (
    <BrandContext.Provider value={{ brand, updateBrand, uploadLogo }}>
      {children}
    </BrandContext.Provider>
  )
}