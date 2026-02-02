import { motion } from 'framer-motion'
import { Map, Plane, Satellite } from 'lucide-react'
import { HealthIndexMap } from '../../types'
import { mockHealthIndexMaps, getAllFields } from '../../mock/data'
import { format } from 'date-fns'

export default function NDVIDroneSatellite() {
  const fields = getAllFields()

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'ndvi':
        return Map
      case 'drone':
        return Plane
      case 'satellite':
        return Satellite
      default:
        return Map
    }
  }

  const getSourceLabel = (source: string) => {
    return source.toUpperCase()
  }

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
      case 'moderate':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
      case 'poor':
        return 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
      case 'critical':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
    }
  }

  const getHealthIndexColor = (index: number) => {
    if (index >= 70) return 'text-green-600 dark:text-green-400'
    if (index >= 50) return 'text-yellow-600 dark:text-yellow-400'
    if (index >= 30) return 'text-orange-600 dark:text-orange-400'
    return 'text-red-600 dark:text-red-400'
  }

  return (
    <div className="glass-panel p-6">
      <div className="flex items-center gap-3 mb-4">
        <Map className="w-6 h-6 text-primary-600 dark:text-primary-400" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          NDVI / Drone / Satellite (optional)
        </h3>
      </div>

      <div className="space-y-4">
        {mockHealthIndexMaps.map((map) => {
          const field = fields.find(f => f.id === map.fieldId)
          const SourceIcon = getSourceIcon(map.source)
          return (
            <motion.div
              key={map.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <SourceIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {getSourceLabel(map.source)} Health Index
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {field?.name || `Field ${map.fieldId}`}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-bold ${getHealthIndexColor(map.healthIndex)}`}>
                    {map.healthIndex}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Health Index</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                <div>
                  <div className="text-gray-600 dark:text-gray-400 mb-1 text-xs">Date</div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {format(new Date(map.date), 'MMM d, yyyy')}
                  </p>
                </div>
                <div>
                  <div className="text-gray-600 dark:text-gray-400 mb-1 text-xs">Source</div>
                  <p className="font-medium text-gray-900 dark:text-white capitalize">
                    {map.source}
                  </p>
                </div>
              </div>

              {/* Health Index Map Placeholder */}
              {map.mapUrl && (
                <div className="mb-3">
                  <div className="w-full h-48 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
                    Health Index Map Preview
                    <br />
                    <span className="text-xs">({map.mapUrl})</span>
                  </div>
                </div>
              )}

              {/* Zones */}
              {map.zones && map.zones.length > 0 && (
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Health Zones:
                  </p>
                  <div className="space-y-2">
                    {map.zones.map((zone) => (
                      <div
                        key={zone.id}
                        className={`p-2 rounded-lg ${getHealthStatusColor(zone.status)}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium capitalize">{zone.status}</span>
                          <span className="text-sm font-bold">{zone.healthIndex}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
