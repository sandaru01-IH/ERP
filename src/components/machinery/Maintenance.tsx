import { motion } from 'framer-motion'
import { Wrench, Calendar, Clock, AlertCircle, Package, CheckCircle } from 'lucide-react'
import { Asset, BreakdownTicket } from '../../types'
import { mockAssets, mockBreakdownTickets } from '../../mock/data'
import { format } from 'date-fns'

export default function Maintenance() {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'closed':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
      case 'in_progress':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
      case 'reported':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
    }
  }

  return (
    <div className="space-y-6">
      {/* Preventive Schedule */}
      <div className="glass-panel p-6">
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Preventive Schedule (Service Hours)
          </h3>
        </div>
        <div className="space-y-4">
          {mockAssets
            .flatMap((asset) =>
              asset.maintenanceHistory
                .filter((m) => m.type === 'preventive' && m.serviceHours)
                .map((m) => ({ asset, maintenance: m }))
            )
            .map(({ asset, maintenance }) => (
              <motion.div
                key={maintenance.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{asset.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{maintenance.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary-600 dark:text-primary-400">
                      {maintenance.serviceHours}h
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Service Hours</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                  <div>
                    <div className="text-gray-600 dark:text-gray-400 mb-1 text-xs">Date</div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {format(new Date(maintenance.date), 'MMM d, yyyy')}
                    </p>
                  </div>
                  {maintenance.nextDueDate && (
                    <div>
                      <div className="text-gray-600 dark:text-gray-400 mb-1 text-xs">Next Due</div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {format(new Date(maintenance.nextDueDate), 'MMM d, yyyy')}
                      </p>
                    </div>
                  )}
                  <div>
                    <div className="text-gray-600 dark:text-gray-400 mb-1 text-xs">Cost</div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      LKR {maintenance.cost.toLocaleString()}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>

      {/* Breakdown Tickets */}
      <div className="glass-panel p-6">
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Breakdown Tickets</h3>
        </div>
        <div className="space-y-4">
          {mockBreakdownTickets.map((ticket) => {
            const asset = mockAssets.find((a) => a.id === ticket.assetId)
            return (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl border ${getPriorityColor(ticket.priority)}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {asset?.name || `Asset ${ticket.assetId}`}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{ticket.description}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`px-2 py-1 rounded-lg text-xs font-medium capitalize ${getPriorityColor(ticket.priority)}`}
                    >
                      {ticket.priority}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-lg text-xs font-medium capitalize ${getStatusColor(ticket.status)}`}
                    >
                      {ticket.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-3">
                  <div>
                    <div className="text-gray-600 dark:text-gray-400 mb-1 text-xs">Reported</div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {format(new Date(ticket.reportedDate), 'MMM d, yyyy')}
                    </p>
                  </div>
                  <div>
                    <div className="text-gray-600 dark:text-gray-400 mb-1 text-xs">Reported By</div>
                    <p className="font-medium text-gray-900 dark:text-white">{ticket.reportedBy}</p>
                  </div>
                  {ticket.assignedTo && (
                    <div>
                      <div className="text-gray-600 dark:text-gray-400 mb-1 text-xs">Assigned To</div>
                      <p className="font-medium text-gray-900 dark:text-white">{ticket.assignedTo}</p>
                    </div>
                  )}
                  {ticket.cost && (
                    <div>
                      <div className="text-gray-600 dark:text-gray-400 mb-1 text-xs">Cost</div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        LKR {ticket.cost.toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>

                {ticket.resolution && (
                  <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Resolution:</p>
                    <p className="text-sm text-gray-900 dark:text-white">{ticket.resolution}</p>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Spare Parts Consumption */}
      <div className="glass-panel p-6">
        <div className="flex items-center gap-3 mb-4">
          <Package className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Spare Parts Consumption</h3>
        </div>
        <div className="space-y-4">
          {mockAssets
            .flatMap((asset) =>
              asset.maintenanceHistory
                .filter((m) => m.spareParts && m.spareParts.length > 0)
                .map((m) => ({ asset, maintenance: m }))
            )
            .map(({ asset, maintenance }) => (
              <motion.div
                key={maintenance.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
              >
                <div className="mb-3">
                  <p className="font-semibold text-gray-900 dark:text-white">{asset.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {format(new Date(maintenance.date), 'MMM d, yyyy')} • {maintenance.description}
                  </p>
                </div>
                <div className="space-y-2">
                  {maintenance.spareParts?.map((part) => (
                    <div
                      key={part.id}
                      className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50 flex items-center justify-between text-sm"
                    >
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{part.partName}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {part.quantity} {part.unit}
                          {part.issuedBy && ` • Issued by ${part.issuedBy}`}
                        </p>
                      </div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        LKR {part.cost.toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  )
}
