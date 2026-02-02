export interface FieldBoundary {
  id: string
  fieldId: string
  coordinates: [number, number][]
  area: number
  slope?: number
  elevation?: number
}

export interface Road {
  id: string
  name: string
  type: 'road' | 'path' | 'drain' | 'water_body'
  coordinates: [number, number][]
}

export interface Building {
  id: string
  name: string
  type: 'factory' | 'store' | 'labour_line' | 'office'
  coordinates: [number, number]
}

export interface SoilZone {
  id: string
  name: string
  type: string
  fertility: 'high' | 'medium' | 'low'
  coordinates: [number, number][]
}

export interface ForestryZone {
  id: string
  name: string
  type: 'shade_trees' | 'forestry'
  density: number
  coordinates: [number, number][]
}

export interface RestrictedArea {
  id: string
  name: string
  type: 'riparian_buffer' | 'protected' | 'restricted'
  coordinates: [number, number][]
}

export interface FieldProfile {
  fieldId: string
  crop?: {
    type: string
    variety: string
    age: number
  }
  inputHistory: {
    type: 'fertilizer' | 'spray'
    date: string
    product: string
    quantity: number
  }[]
  yieldHistory: {
    date: string
    yield: number
    unit: string
  }[]
  issues: {
    type: 'disease' | 'erosion' | 'weeds'
    description: string
    date: string
    severity: 'low' | 'medium' | 'high'
  }[]
}

export interface Route {
  id: string
  name: string
  type: 'spray' | 'harvest' | 'plucking'
  coordinates: [number, number][]
  fields: string[]
  machineryAccess: 'suitable' | 'limited' | 'unsuitable'
}
