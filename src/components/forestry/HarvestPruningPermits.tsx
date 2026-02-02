import { motion } from 'framer-motion'
import { FileText, CheckCircle, Clock, XCircle, FileCheck, MapPin } from 'lucide-react'
import { HarvestPruningPermit } from '../../types'
import { mockHarvestPruningPermits, getAllFields } from '../../mock/data'
import { format } from 'date-fns'

export default function HarvestPruningPermits() {
  const fields = getAllFields()

  const getFieldName = (fieldId: string) => {
    const field = fields.find((f) => f.id === fieldId)
    return field?.name || `Field ${fieldId}`
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return CheckCircle
      case 'pending':
        return Clock
      case 'rejected':
        return XCircle
      case 'completed':
        return CheckCircle
      default:
        return Clock
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
      case 'completed':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
      case 'rejected':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
    }
  }

  return (
    <div className="glass-panel p-6">
      <div className="flex items-center gap-3 mb-4">
        <FileText className="w-6 h-6 text-primary-600 dark:text-primary-400" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Harvest / Pruning Permits
        </h3>
      </div>

      <div className="space-y-4">
        {mockHarvestPruningPermits.map((permit) => {
          const StatusIcon = getStatusIcon(permit.status)
          return (
            <motion.div
              key={permit.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`px-2 py-1 rounded-lg text-xs font-medium capitalize ${
                        permit.type === 'harvest'
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                          : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
                      }`}
                    >
                      {permit.type}
                    </span>
                    <StatusIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </div>
                  <p className="font-semibold text-gray-900 dark:text-white">{permit.purpose}</p>
                  <div className="flex items-center gap-2 mt-1 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span>{getFieldName(permit.fieldId)}</span>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-lg text-xs font-medium capitalize ${getStatusColor(permit.status)}`}>
                  {permit.status}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-3">
                <div>
                  <div className="text-gray-600 dark:text-gray-400 mb-1 text-xs">Requested</div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {format(new Date(permit.requestedDate), 'MMM d, yyyy')}
                  </p>
                </div>
                <div>
                  <div className="text-gray-600 dark:text-gray-400 mb-1 text-xs">Requested By</div>
                  <p className="font-medium text-gray-900 dark:text-white">{permit.requestedBy}</p>
                </div>
                {permit.quantity && (
                  <div>
                    <div className="text-gray-600 dark:text-gray-400 mb-1 text-xs">Quantity</div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {permit.quantity} {permit.unit || 'units'}
                    </p>
                  </div>
                )}
                {permit.approvedBy && (
                  <div>
                    <div className="text-gray-600 dark:text-gray-400 mb-1 text-xs">Approved By</div>
                    <p className="font-medium text-gray-900 dark:text-white">{permit.approvedBy}</p>
                  </div>
                )}
              </div>

              {permit.legalDocuments && permit.legalDocuments.length > 0 && (
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 mb-2">
                    <FileCheck className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      Legal Documents
                    </span>
                  </div>
                  <div className="space-y-1">
                    {permit.legalDocuments.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50 text-sm"
                      >
                        <span className="text-gray-700 dark:text-gray-300">{doc.name}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-500">
                          {format(new Date(doc.uploadedDate), 'MMM d, yyyy')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {permit.notes && (
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-700 dark:text-gray-300">{permit.notes}</p>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
