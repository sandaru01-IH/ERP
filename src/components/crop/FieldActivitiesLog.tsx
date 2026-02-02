import { motion } from 'framer-motion'
import { ClipboardList, Scissors, RefreshCw, Leaf, TreePine } from 'lucide-react'
import { FieldActivity } from '../../types'
import { mockFieldActivities, getAllFields } from '../../mock/data'
import { format } from 'date-fns'

const activityIcons = {
  pruning: Scissors,
  infilling: RefreshCw,
  mulching: Leaf,
  shade_management: TreePine,
}

const activityColors = {
  pruning: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
  infilling: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  mulching: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  shade_management: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
}

export default function FieldActivitiesLog() {
  const fields = getAllFields()

  return (
    <div className="glass-panel p-6">
      <div className="flex items-center gap-3 mb-4">
        <ClipboardList className="w-6 h-6 text-primary-600 dark:text-primary-400" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Field Activities Log</h3>
      </div>

      <div className="space-y-3">
        {mockFieldActivities.map((activity) => {
          const Icon = activityIcons[activity.type]
          const field = fields.find(f => f.id === activity.fieldId)
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${activityColors[activity.type]}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white capitalize">
                      {activity.type.replace('_', ' ')}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {field?.name || `Field ${activity.fieldId}`}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-500">
                  {format(new Date(activity.date), 'MMM d, yyyy')}
                </span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">{activity.description}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">By: {activity.performedBy}</p>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
