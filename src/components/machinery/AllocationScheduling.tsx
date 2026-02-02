import { motion } from 'framer-motion'
import { Calendar, MapPin, User, CheckCircle, Clock } from 'lucide-react'
import { Assignment, Asset } from '../../types'
import { mockAssets, getAllFields } from '../../mock/data'
import { format } from 'date-fns'

export default function AllocationScheduling() {
  const fields = getAllFields()

  // Get all assignments from all assets
  const allAssignments: (Assignment & { asset: Asset })[] = []
  mockAssets.forEach((asset) => {
    asset.assignments.forEach((assignment) => {
      allAssignments.push({ ...assignment, asset })
    })
  })

  const getStatusIcon = (status: string) => {
    return status === 'active' ? CheckCircle : Clock
  }

  const getStatusColor = (status: string) => {
    return status === 'active'
      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
  }

  return (
    <div className="glass-panel p-6">
      <div className="flex items-center gap-3 mb-4">
        <Calendar className="w-6 h-6 text-primary-600 dark:text-primary-400" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Allocation & Scheduling</h3>
      </div>

      <div className="space-y-4">
        {allAssignments.map((assignment) => {
          const field = fields.find((f) => f.id === assignment.fieldId)
          const StatusIcon = getStatusIcon(assignment.status)
          return (
            <motion.div
              key={assignment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <StatusIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {assignment.asset.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {assignment.asset.category}
                    </p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-lg text-xs font-medium capitalize ${getStatusColor(assignment.status)}`}>
                  {assignment.status}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                    <MapPin className="w-4 h-4" />
                    <span className="text-xs">Field</span>
                  </div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {field?.name || `Field ${assignment.fieldId}`}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-xs">Start Date</span>
                  </div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {format(new Date(assignment.startDate), 'MMM d, yyyy')}
                  </p>
                </div>
                {assignment.endDate && (
                  <div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                      <span className="text-xs">End Date</span>
                    </div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {format(new Date(assignment.endDate), 'MMM d, yyyy')}
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
