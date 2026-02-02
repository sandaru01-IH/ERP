import { motion } from 'framer-motion'
import { Wrench, MapPin, Calendar, DollarSign, CheckCircle, Clock, AlertCircle, Link } from 'lucide-react'
import { ErosionDrainageProject } from '../../types'
import { mockErosionDrainageProjects, getAllFields } from '../../mock/data'
import { format } from 'date-fns'

export default function ErosionDrainageProjects() {
  const fields = getAllFields()

  const getFieldName = (fieldId: string) => {
    const field = fields.find((f) => f.id === fieldId)
    return field?.name || `Field ${fieldId}`
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'bund':
        return 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
      case 'drain':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
      case 'culvert':
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return CheckCircle
      case 'in_progress':
        return Clock
      case 'maintenance_required':
        return AlertCircle
      case 'planned':
        return Clock
      default:
        return Clock
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
      case 'in_progress':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
      case 'planned':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
      case 'maintenance_required':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
    }
  }

  return (
    <div className="glass-panel p-6">
      <div className="flex items-center gap-3 mb-4">
        <Wrench className="w-6 h-6 text-primary-600 dark:text-primary-400" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Erosion / Drainage Projects
        </h3>
      </div>

      <div className="space-y-4">
        {mockErosionDrainageProjects.map((project) => {
          const StatusIcon = getStatusIcon(project.status)
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`px-2 py-1 rounded-lg text-xs font-medium capitalize ${getTypeColor(project.type)}`}
                    >
                      {project.type}
                    </span>
                    {project.geoLinked && (
                      <div className="flex items-center gap-1 text-xs text-primary-600 dark:text-primary-400">
                        <Link className="w-3 h-3" />
                        <span>Geo Linked</span>
                      </div>
                    )}
                  </div>
                  <p className="font-semibold text-gray-900 dark:text-white">{project.name}</p>
                  <div className="flex items-center gap-2 mt-1 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span>
                      {getFieldName(project.fieldId)} • {project.location}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <StatusIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  <span
                    className={`px-2 py-1 rounded-lg text-xs font-medium capitalize ${getStatusColor(project.status)}`}
                  >
                    {project.status.replace('_', ' ')}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-3">
                {project.startDate && (
                  <div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1 text-xs">
                      <Calendar className="w-4 h-4" />
                      <span>Start</span>
                    </div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {format(new Date(project.startDate), 'MMM d, yyyy')}
                    </p>
                  </div>
                )}
                {project.completedDate && (
                  <div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1 text-xs">
                      <CheckCircle className="w-4 h-4" />
                      <span>Completed</span>
                    </div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {format(new Date(project.completedDate), 'MMM d, yyyy')}
                    </p>
                  </div>
                )}
                {project.cost && (
                  <div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1 text-xs">
                      <DollarSign className="w-4 h-4" />
                      <span>Cost</span>
                    </div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      LKR {project.cost.toLocaleString()}
                    </p>
                  </div>
                )}
              </div>

              {project.description && (
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-700 dark:text-gray-300">{project.description}</p>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
