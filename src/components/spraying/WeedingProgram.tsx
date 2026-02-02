import { motion } from 'framer-motion'
import { Scissors, MapPin, Calendar, CheckCircle, Clock, XCircle, Wrench, Droplet } from 'lucide-react'
import { WeedingProgram } from '../../types'
import { mockWeedingPrograms, getAllFields } from '../../mock/data'
import { format } from 'date-fns'

export default function WeedingProgramComponent() {
  const fields = getAllFields()

  const getFieldName = (fieldId: string) => {
    const field = fields.find((f) => f.id === fieldId)
    return field?.name || `Field ${fieldId}`
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'manual':
        return Scissors
      case 'mechanical':
        return Wrench
      case 'chemical':
        return Droplet
      default:
        return Scissors
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'manual':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
      case 'mechanical':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
      case 'chemical':
        return 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
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
      case 'planned':
        return Clock
      case 'skipped':
        return XCircle
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
      case 'skipped':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
    }
  }

  return (
    <div className="glass-panel p-6">
      <div className="flex items-center gap-3 mb-4">
        <Scissors className="w-6 h-6 text-primary-600 dark:text-primary-400" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Weeding Program</h3>
      </div>

      <div className="space-y-4">
        {mockWeedingPrograms.map((program) => {
          const TypeIcon = getTypeIcon(program.type)
          const StatusIcon = getStatusIcon(program.status)
          return (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <TypeIcon className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                    <span
                      className={`px-2 py-1 rounded-lg text-xs font-medium capitalize ${getTypeColor(program.type)}`}
                    >
                      {program.type}
                    </span>
                  </div>
                  <p className="font-semibold text-gray-900 dark:text-white">{program.method}</p>
                  <div className="flex items-center gap-2 mt-1 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span>{getFieldName(program.fieldId)}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <StatusIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  <span
                    className={`px-2 py-1 rounded-lg text-xs font-medium capitalize ${getStatusColor(program.status)}`}
                  >
                    {program.status.replace('_', ' ')}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm mb-3">
                <div>
                  <div className="text-gray-600 dark:text-gray-400 mb-1 text-xs">Area</div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {program.area} {program.areaUnit}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1 text-xs">
                    <Calendar className="w-4 h-4" />
                    <span>Scheduled</span>
                  </div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {format(new Date(program.scheduledDate), 'MMM d, yyyy')}
                  </p>
                </div>
                {program.completedDate && (
                  <div>
                    <div className="text-gray-600 dark:text-gray-400 mb-1 text-xs">Completed</div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {format(new Date(program.completedDate), 'MMM d, yyyy')}
                    </p>
                  </div>
                )}
              </div>

              {program.notes && (
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-700 dark:text-gray-300">{program.notes}</p>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
