import { Layers, MapPin, Factory, Sprout, Shield } from 'lucide-react'

interface LayerControlProps {
  layers: {
    boundaries: boolean
    roads: boolean
    buildings: boolean
    soil: boolean
    forestry: boolean
    restricted: boolean
  }
  onToggle: (layer: string) => void
}

export default function LayerControl({ layers, onToggle }: LayerControlProps) {
  const layerConfig = [
    { key: 'boundaries', label: 'Field Boundaries', icon: MapPin, color: 'text-green-600 dark:text-green-400' },
    { key: 'roads', label: 'Roads/Paths/Drains', icon: Layers, color: 'text-orange-600 dark:text-orange-400' },
    { key: 'buildings', label: 'Buildings', icon: Factory, color: 'text-purple-600 dark:text-purple-400' },
    { key: 'soil', label: 'Soil Type / Fertility Zones', icon: Sprout, color: 'text-blue-600 dark:text-blue-400' },
    { key: 'forestry', label: 'Shade Trees / Forestry Zones', icon: Sprout, color: 'text-emerald-600 dark:text-emerald-400' },
    { key: 'restricted', label: 'Restricted / Protected Areas', icon: Shield, color: 'text-red-600 dark:text-red-400' },
  ]

  return (
    <div className="glass-panel p-6">
      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Layer Control</h3>
      <div className="space-y-2">
        {layerConfig.map((layer) => {
          const Icon = layer.icon
          const isActive = layers[layer.key as keyof typeof layers]
          return (
            <label
              key={layer.key}
              className="flex items-center justify-between p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 ${layer.color}`} />
                <span className="text-sm font-medium text-gray-900 dark:text-white">{layer.label}</span>
              </div>
              <input
                type="checkbox"
                checked={isActive}
                onChange={() => onToggle(layer.key)}
                className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
              />
            </label>
          )
        })}
      </div>
    </div>
  )
}
