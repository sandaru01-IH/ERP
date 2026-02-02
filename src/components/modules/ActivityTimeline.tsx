import { motion } from 'framer-motion'
import { Activity } from '../../types'
import { format } from 'date-fns'
import { Clock } from 'lucide-react'

interface ActivityTimelineProps {
  activities: Activity[]
}

export default function ActivityTimeline({ activities }: ActivityTimelineProps) {
  return (
    <div className="glass-panel p-6">
      <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0"
          >
            <div className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30">
              <Clock className="w-4 h-4 text-primary-600 dark:text-primary-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {activity.description}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {format(new Date(activity.timestamp), 'MMM d, h:mm a')}
                </span>
                {activity.user && (
                  <>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {activity.user}
                    </span>
                  </>
                )}
              </div>
            </div>
            {activity.status && (
              <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                activity.status === 'completed'
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                  : activity.status === 'pending'
                  ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
              }`}>
                {activity.status}
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
