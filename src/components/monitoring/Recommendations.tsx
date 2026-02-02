import { motion } from 'framer-motion'
import { Lightbulb, Droplet, Wrench, AlertCircle, CheckCircle, Clock, User } from 'lucide-react'
import { MonitoringRecommendation } from '../../types'
import { mockMonitoringRecommendations, getAllFields } from '../../mock/data'
import { format } from 'date-fns'

export default function Recommendations() {
  const fields = getAllFields()

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'spray':
        return Droplet
      case 'fertilizer_adjustment':
        return AlertCircle
      case 'drainage_repair':
        return Wrench
      default:
        return Lightbulb
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'spray':
        return 'Suggested Spray'
      case 'fertilizer_adjustment':
        return 'Fertilizer Adjustment'
      case 'drainage_repair':
        return 'Drainage Repair'
      default:
        return type
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return CheckCircle
      case 'in_progress':
      case 'assigned':
        return Clock
      case 'approved':
        return CheckCircle
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
      case 'assigned':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
      case 'approved':
        return 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400'
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
    }
  }

  return (
    <div className="glass-panel p-6">
      <div className="flex items-center gap-3 mb-4">
        <Lightbulb className="w-6 h-6 text-primary-600 dark:text-primary-400" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Recommendations</h3>
      </div>

      <div className="space-y-4">
        {mockMonitoringRecommendations.map((rec) => {
          const field = fields.find(f => f.id === rec.fieldId)
          const TypeIcon = getTypeIcon(rec.type)
          const StatusIcon = getStatusIcon(rec.status)
          return (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl border ${getPriorityColor(rec.priority)}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <TypeIcon className="w-5 h-5" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {getTypeLabel(rec.type)}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {field?.name || `Field ${rec.fieldId}`}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium capitalize ${getPriorityColor(rec.priority)}`}>
                    {rec.priority}
                  </span>
                  <div className="flex items-center gap-2">
                    <StatusIcon className={`w-4 h-4 ${getStatusColor(rec.status).split(' ')[1]}`} />
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium capitalize ${getStatusColor(rec.status)}`}>
                      {rec.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-900 dark:text-white mb-3">{rec.description}</p>

              <div className="mb-3 p-3 rounded-lg bg-white/50 dark:bg-gray-800/50">
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Suggested Action:
                </p>
                <p className="text-sm text-gray-900 dark:text-white">{rec.suggestedAction}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                {rec.estimatedCost && (
                  <div>
                    <div className="text-gray-600 dark:text-gray-400 mb-1 text-xs">Est. Cost</div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      LKR {rec.estimatedCost.toLocaleString()}
                    </p>
                  </div>
                )}
                <div>
                  <div className="text-gray-600 dark:text-gray-400 mb-1 text-xs">Created</div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {format(new Date(rec.createdDate), 'MMM d, yyyy')}
                  </p>
                </div>
                {rec.assignedTo && (
                  <div>
                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 mb-1">
                      <User className="w-3 h-3" />
                      <span className="text-xs">Assigned To</span>
                    </div>
                    <p className="font-medium text-gray-900 dark:text-white">{rec.assignedTo}</p>
                  </div>
                )}
                {rec.completedDate && (
                  <div>
                    <div className="text-gray-600 dark:text-gray-400 mb-1 text-xs">Completed</div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {format(new Date(rec.completedDate), 'MMM d, yyyy')}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
