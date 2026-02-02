import { useEffect, useState } from 'react'

interface EstateMapClientProps {
  selectedFieldId?: string | null
  onFieldClick: (fieldId: string) => void
  showLayers: {
    boundaries: boolean
    roads: boolean
    buildings: boolean
    soil: boolean
    forestry: boolean
    restricted: boolean
  }
}

export default function EstateMapClient(props: EstateMapClientProps) {
  const [MapComponent, setMapComponent] = useState<any>(null)

  useEffect(() => {
    // Dynamically import the map component only on client side
    import('./EstateMap').then((module) => {
      setMapComponent(() => module.default)
    })
  }, [])

  if (!MapComponent) {
    return (
      <div className="relative h-[600px] w-full rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">Loading map...</p>
      </div>
    )
  }

  return <MapComponent {...props} />
}
