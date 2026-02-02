import { motion } from 'framer-motion'
import { Package, FileText, Calendar, AlertTriangle, CheckCircle, Clock } from 'lucide-react'
import { ChemicalStoreItem, ChemicalIssue } from '../../types'
import { mockChemicalStoreItems, mockChemicalIssues } from '../../mock/data'
import { format } from 'date-fns'

export default function ChemicalStore() {
  const getItem = (itemId: string) => {
    return mockChemicalStoreItems.find((item) => item.id === itemId)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_stock':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
      case 'low_stock':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
      case 'expired':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
      case 'issued':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
    }
  }

  const isExpired = (expiryDate: string) => {
    return new Date(expiryDate) < new Date()
  }

  const isExpiringSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate)
    const threeMonthsFromNow = new Date()
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3)
    return expiry <= threeMonthsFromNow && expiry > new Date()
  }

  return (
    <div className="space-y-6">
      {/* Chemical Store Items */}
      <div className="glass-panel p-6">
        <div className="flex items-center gap-3 mb-4">
          <Package className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Chemical Store</h3>
        </div>
        <div className="space-y-4">
          {mockChemicalStoreItems.map((item) => {
            const expired = isExpired(item.expiryDate)
            const expiringSoon = isExpiringSoon(item.expiryDate)
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{item.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {item.activeIngredient} • {item.category}
                    </p>
                    {item.location && (
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        Location: {item.location}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {expired && <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />}
                    {expiringSoon && !expired && (
                      <Clock className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                    )}
                    <span
                      className={`px-2 py-1 rounded-lg text-xs font-medium capitalize ${getStatusColor(item.status)}`}
                    >
                      {item.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-3">
                  <div>
                    <div className="text-gray-600 dark:text-gray-400 mb-1 text-xs">Batch</div>
                    <p className="font-medium text-gray-900 dark:text-white">{item.batchNumber}</p>
                  </div>
                  <div>
                    <div className="text-gray-600 dark:text-gray-400 mb-1 text-xs">Quantity</div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {item.quantity} {item.unit}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1 text-xs">
                      <Calendar className="w-4 h-4" />
                      <span>Expiry</span>
                    </div>
                    <p
                      className={`font-medium ${
                        expired
                          ? 'text-red-600 dark:text-red-400'
                          : expiringSoon
                            ? 'text-yellow-600 dark:text-yellow-400'
                            : 'text-gray-900 dark:text-white'
                      }`}
                    >
                      {format(new Date(item.expiryDate), 'MMM d, yyyy')}
                    </p>
                  </div>
                  <div>
                    <div className="text-gray-600 dark:text-gray-400 mb-1 text-xs">Received</div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {format(new Date(item.receivedDate), 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>

                {item.msdsUrl && (
                  <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                      <a
                        href={item.msdsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
                      >
                        View MSDS
                      </a>
                    </div>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Chemical Issues */}
      <div className="glass-panel p-6">
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Issue Control</h3>
        </div>
        <div className="space-y-4">
          {mockChemicalIssues.map((issue) => {
            const item = getItem(issue.itemId)
            return (
              <motion.div
                key={issue.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {item?.name || `Item ${issue.itemId}`}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Issued to: {issue.issuedTo}
                    </p>
                  </div>
                  <p className="text-lg font-bold text-primary-600 dark:text-primary-400">
                    {issue.quantity} {issue.unit}
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                  <div>
                    <div className="text-gray-600 dark:text-gray-400 mb-1 text-xs">Purpose</div>
                    <p className="font-medium text-gray-900 dark:text-white">{issue.purpose}</p>
                  </div>
                  <div>
                    <div className="text-gray-600 dark:text-gray-400 mb-1 text-xs">Issued Date</div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {format(new Date(issue.issuedDate), 'MMM d, yyyy')}
                    </p>
                  </div>
                  <div>
                    <div className="text-gray-600 dark:text-gray-400 mb-1 text-xs">Issued By</div>
                    <p className="font-medium text-gray-900 dark:text-white">{issue.issuedBy}</p>
                  </div>
                </div>
                {issue.approvedBy && (
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Approved by: <span className="font-medium">{issue.approvedBy}</span>
                    </p>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
