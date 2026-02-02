import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Organization, Estate, Field } from '../types'

interface AppContextType {
  selectedEstate: Estate | null
  selectedField: Field | null
  setSelectedEstate: (estate: Estate | null) => void
  setSelectedField: (field: Field | null) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [selectedEstate, setSelectedEstateState] = useState<Estate | null>(() => {
    const saved = localStorage.getItem('selectedEstate')
    return saved ? JSON.parse(saved) : null
  })

  const [selectedField, setSelectedFieldState] = useState<Field | null>(() => {
    const saved = localStorage.getItem('selectedField')
    return saved ? JSON.parse(saved) : null
  })

  useEffect(() => {
    if (selectedEstate) {
      localStorage.setItem('selectedEstate', JSON.stringify(selectedEstate))
    } else {
      localStorage.removeItem('selectedEstate')
    }
  }, [selectedEstate])

  useEffect(() => {
    if (selectedField) {
      localStorage.setItem('selectedField', JSON.stringify(selectedField))
    } else {
      localStorage.removeItem('selectedField')
    }
  }, [selectedField])

  const setSelectedEstate = (estate: Estate | null) => {
    setSelectedEstateState(estate)
    if (!estate) {
      setSelectedFieldState(null)
    }
  }

  const setSelectedField = (field: Field | null) => {
    setSelectedFieldState(field)
  }

  return (
    <AppContext.Provider value={{
      selectedEstate,
      selectedField,
      setSelectedEstate,
      setSelectedField,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
