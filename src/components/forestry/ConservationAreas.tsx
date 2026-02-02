import { motion } from 'framer-motion'
import { Shield, MapPin, Calendar, CheckCircle, Clock } from 'lucide-react'
import { ConservationArea } from '../../types'
import { mockConservationAreas, getAllFields } from '../../mock/data'
import { format } from 'date-fns'

export default function ConservationAreas() {
  const fields = getAllFields()

  const getFieldName = (fieldId?: string) => {
    if (!fieldId) return 'N/A'
    const field = fields.find((f) => f.id === fieldId)
    return field?.name || `Field ${fieldId}`
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'buffer_zone':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
      case 'reforestation_block':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
      case 'protected_area':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
      case 'planned':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
      case 'completed':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
    }
  }

  const formatType = (type: string) => {
    return type.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())
  }

  return (
    <div className="glass-panel p-6">
      <div className="flex items-center gap-3 mb-4">
        <Shield className="w-6 h-6 text-primary-600 dark:text-primary-400" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Conservation Areas</h3>
      </div>

      <div className="space-y-4">
        {mockConservationAreas.map((area) => (
          <motion.div
            key={area.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{area.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`px-2 py-1 rounded-lg text-xs font-medium ${getTypeColor(area.type)}`}
                  >
                    {formatType(area.type)}
                  </span>
                  {area.fieldId && (
                    <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span>{getFieldName(area.fieldId)}</span>
                    </div>
                  )}
                </div>
              </div>
              <span
                className={`px-2 py-1 rounded-lg text-xs font-medium capitalize ${getStatusColor(area.status)}`}
              >
                {area.status}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm mb-3">
              <div>
                <div className="text-gray-600 dark:text-gray-400 mb-1 text-xs">Area</div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {area.area} {area.areaUnit}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1 text-xs">
                  <Calendar className="w-4 h-4" />
                  <span>Established</span>
                </div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {format(new Date(area.establishedDate), 'MMM d, yyyy')}
                </p>
              </div>
            </div>

            {area.description && (
              <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-700 dark:text-gray-300">{area.description}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
