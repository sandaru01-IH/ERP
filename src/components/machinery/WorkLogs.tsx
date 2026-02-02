import { motion } from 'framer-motion'
import { ClipboardList, Clock, MapPin, Package, CheckCircle, AlertTriangle } from 'lucide-react'
import { WorkLog, Asset } from '../../types'
import { mockWorkLogs, mockAssets, getAllFields } from '../../mock/data'
import { format } from 'date-fns'

export default function WorkLogs() {
  const fields = getAllFields()

  const getWorkLogWithAsset = (log: WorkLog) => {
    const asset = mockAssets.find((a) => a.id === log.assetId)
    return { log, asset }
  }

  const getChecklistStatusColor = (status: string) => {
    switch (status) {
      case 'ok':
        return 'text-green-600 dark:text-green-400'
      case 'needs_attention':
        return 'text-yellow-600 dark:text-yellow-400'
      case 'not_checked':
        return 'text-gray-600 dark:text-gray-400'
      default:
        return 'text-gray-600 dark:text-gray-400'
    }
  }

  return (
    <div className="glass-panel p-6">
      <div className="flex items-center gap-3 mb-4">
        <ClipboardList className="w-6 h-6 text-primary-600 dark:text-primary-400" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Work Logs</h3>
      </div>

      <div className="space-y-4">
        {mockWorkLogs.map((workLog) => {
          const { log, asset } = getWorkLogWithAsset(workLog)
          const field = log.fieldId ? fields.find((f) => f.id === log.fieldId) : null
          return (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {asset?.name || `Asset ${log.assetId}`}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Operator: {log.operator}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-primary-600 dark:text-primary-400">
                    {log.hours}h
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Hours</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-3">
                <div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs">Date</span>
                  </div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {format(new Date(log.date), 'MMM d, yyyy')}
                  </p>
                </div>
                {log.distance !== undefined && (
                  <div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                      <MapPin className="w-4 h-4" />
                      <span className="text-xs">Distance</span>
                    </div>
                    <p className="font-medium text-gray-900 dark:text-white">{log.distance} km</p>
                  </div>
                )}
                {log.output !== undefined && (
                  <div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                      <Package className="w-4 h-4" />
                      <span className="text-xs">Output</span>
                    </div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {log.output} {log.outputUnit || 'units'}
                    </p>
                  </div>
                )}
                {field && (
                  <div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                      <span className="text-xs">Field</span>
                    </div>
                    <p className="font-medium text-gray-900 dark:text-white">{field.name}</p>
                  </div>
                )}
              </div>

              {log.task && (
                <div className="mb-3">
                  <span className="text-xs text-gray-600 dark:text-gray-400">Task: </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {log.task}
                  </span>
                </div>
              )}

              {log.preStartChecklist && (
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 mb-2">
                    {log.preStartChecklist.completed ? (
                      <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                    )}
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      Pre-start Checklist
                    </span>
                  </div>
                  <div className="space-y-1">
                    {log.preStartChecklist.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between text-xs p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50"
                      >
                        <span className="text-gray-700 dark:text-gray-300">{item.name}</span>
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-medium capitalize ${getChecklistStatusColor(item.status)}`}
                          >
                            {item.status.replace('_', ' ')}
                          </span>
                          {item.notes && (
                            <span className="text-gray-500 dark:text-gray-500 text-xs">
                              ({item.notes})
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {log.notes && (
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-700 dark:text-gray-300">{log.notes}</p>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
