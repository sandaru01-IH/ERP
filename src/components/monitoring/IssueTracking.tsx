import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle, Clock, UserCheck, User, XCircle } from 'lucide-react'
import { MonitoringIssue } from '../../types'
import { mockMonitoringIssues, getAllFields } from '../../mock/data'
import { format } from 'date-fns'

export default function IssueTracking() {
  const fields = getAllFields()

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
      case 'completed':
        return CheckCircle
      case 'in_progress':
        return Clock
      case 'assigned':
        return UserCheck
      case 'open':
        return AlertCircle
      default:
        return AlertCircle
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800'
      case 'completed':
        return 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 border-teal-200 dark:border-teal-800'
      case 'in_progress':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800'
      case 'assigned':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800'
      case 'open':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800'
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
    }
  }

  return (
    <div className="glass-panel p-6">
      <div className="flex items-center gap-3 mb-4">
        <AlertCircle className="w-6 h-6 text-primary-600 dark:text-primary-400" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Issue Tracking</h3>
      </div>

      <div className="space-y-4">
        {mockMonitoringIssues.map((issue) => {
          const field = fields.find(f => f.id === issue.fieldId)
          const StatusIcon = getStatusIcon(issue.status)
          return (
            <motion.div
              key={issue.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl border ${getStatusColor(issue.status)}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <StatusIcon className="w-5 h-5" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{issue.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {field?.name || `Field ${issue.fieldId}`}
                    </p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-lg text-xs font-medium capitalize ${getStatusColor(issue.status)}`}>
                  {issue.status.replace('_', ' ')}
                </span>
              </div>

              <p className="text-sm text-gray-900 dark:text-white mb-3">{issue.description}</p>

              {issue.correctiveAction && (
                <div className="mb-3 p-3 rounded-lg bg-white/50 dark:bg-gray-800/50">
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Corrective Action:
                  </p>
                  <p className="text-sm text-gray-900 dark:text-white">{issue.correctiveAction}</p>
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div>
                  <div className="text-gray-600 dark:text-gray-400 mb-1 text-xs">Created</div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {format(new Date(issue.createdDate), 'MMM d, yyyy')}
                  </p>
                </div>
                {issue.dueDate && (
                  <div>
                    <div className="text-gray-600 dark:text-gray-400 mb-1 text-xs">Due Date</div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {format(new Date(issue.dueDate), 'MMM d, yyyy')}
                    </p>
                  </div>
                )}
                {issue.assignedTo && (
                  <div>
                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 mb-1">
                      <User className="w-3 h-3" />
                      <span className="text-xs">Assigned To</span>
                    </div>
                    <p className="font-medium text-gray-900 dark:text-white">{issue.assignedTo}</p>
                  </div>
                )}
                {issue.completedDate && (
                  <div>
                    <div className="text-gray-600 dark:text-gray-400 mb-1 text-xs">Completed</div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {format(new Date(issue.completedDate), 'MMM d, yyyy')}
                    </p>
                  </div>
                )}
              </div>

              {issue.verifiedBy && (
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">Verified by </span>
                    <span className="text-xs font-medium text-gray-900 dark:text-white">
                      {issue.verifiedBy}
                    </span>
                    {issue.verifiedDate && (
                      <>
                        <span className="text-xs text-gray-600 dark:text-gray-400">on </span>
                        <span className="text-xs font-medium text-gray-900 dark:text-white">
                          {format(new Date(issue.verifiedDate), 'MMM d, yyyy')}
                        </span>
                      </>
                    )}
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
