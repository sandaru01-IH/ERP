import { motion } from 'framer-motion'
import { Search, AlertTriangle, Bug, Activity, Leaf, Camera, MapPin } from 'lucide-react'
import { ScoutingObservation } from '../../types'
import { mockScoutingObservations, getAllFields } from '../../mock/data'
import { format } from 'date-fns'

export default function ScoutingInspection() {
  const fields = getAllFields()

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'weed_pressure':
        return Leaf
      case 'pest_incidence':
        return Bug
      case 'disease_incidence':
        return AlertTriangle
      case 'nutrient_deficiency':
        return Activity
      default:
        return Search
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'weed_pressure':
        return 'Weed Pressure'
      case 'pest_incidence':
        return 'Pest Incidence'
      case 'disease_incidence':
        return 'Disease Incidence'
      case 'nutrient_deficiency':
        return 'Nutrient Deficiency'
      default:
        return type
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800'
      case 'high':
        return 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800'
      case 'medium':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800'
      case 'low':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800'
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
    }
  }

  return (
    <div className="glass-panel p-6">
      <div className="flex items-center gap-3 mb-4">
        <Search className="w-6 h-6 text-primary-600 dark:text-primary-400" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Scouting & Inspection</h3>
      </div>

      <div className="space-y-4">
        {mockScoutingObservations.map((obs) => {
          const field = fields.find(f => f.id === obs.fieldId)
          const TypeIcon = getTypeIcon(obs.type)
          return (
            <motion.div
              key={obs.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl border ${getSeverityColor(obs.severity)}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <TypeIcon className="w-5 h-5" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {getTypeLabel(obs.type)}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {field?.name || `Field ${obs.fieldId}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium capitalize ${getSeverityColor(obs.severity)}`}>
                    {obs.severity}
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-900 dark:text-white mb-3">{obs.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm mb-3">
                <div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                    <MapPin className="w-4 h-4" />
                    <span className="text-xs">Location</span>
                  </div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {obs.location || 'Not specified'}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                    <span className="text-xs">Observed By</span>
                  </div>
                  <p className="font-medium text-gray-900 dark:text-white">{obs.observedBy}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                    <span className="text-xs">Date</span>
                  </div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {format(new Date(obs.date), 'MMM d, yyyy')}
                  </p>
                </div>
              </div>

              {obs.photos && obs.photos.length > 0 && (
                <div className="mb-3">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
                    <Camera className="w-4 h-4" />
                    <span className="text-xs">Photo Capture ({obs.photos.length} photos)</span>
                  </div>
                  <div className="flex gap-2">
                    {obs.photos.map((photo, index) => (
                      <div
                        key={index}
                        className="w-16 h-16 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs text-gray-500 dark:text-gray-400"
                      >
                        {photo}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {obs.notes && (
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Notes:</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{obs.notes}</p>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
