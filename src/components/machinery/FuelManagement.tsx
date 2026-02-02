import { motion } from 'framer-motion'
import { Fuel, CheckCircle, Clock, DollarSign, User, MapPin } from 'lucide-react'
import { FuelIssue, Asset } from '../../types'
import { mockFuelIssues, mockAssets } from '../../mock/data'
import { format } from 'date-fns'

export default function FuelManagement() {
  const getFuelIssueWithAsset = (issue: FuelIssue) => {
    const asset = mockAssets.find((a) => a.id === issue.assetId)
    return { issue, asset }
  }

  return (
    <div className="glass-panel p-6">
      <div className="flex items-center gap-3 mb-4">
        <Fuel className="w-6 h-6 text-primary-600 dark:text-primary-400" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Fuel Management</h3>
      </div>

      <div className="space-y-4">
        {mockFuelIssues.map((fuelIssue) => {
          const { issue, asset } = getFuelIssueWithAsset(fuelIssue)
          return (
            <motion.div
              key={issue.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl border ${
                issue.reconciled
                  ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20'
                  : 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {asset?.name || `Asset ${issue.assetId}`}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {issue.quantity} {issue.unit}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {issue.reconciled ? (
                    <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                  ) : (
                    <Clock className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                  )}
                  <span
                    className={`px-2 py-1 rounded-lg text-xs font-medium ${
                      issue.reconciled
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                        : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                    }`}
                  >
                    {issue.reconciled ? 'Reconciled' : 'Pending'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-3">
                <div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-xs">Cost</span>
                  </div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    LKR {issue.cost.toLocaleString()}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                    <User className="w-4 h-4" />
                    <span className="text-xs">Issued By</span>
                  </div>
                  <p className="font-medium text-gray-900 dark:text-white">{issue.issuedBy}</p>
                </div>
                {issue.issuedTo && (
                  <div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                      <span className="text-xs">Issued To</span>
                    </div>
                    <p className="font-medium text-gray-900 dark:text-white">{issue.issuedTo}</p>
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                    <span className="text-xs">Date</span>
                  </div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {format(new Date(issue.date), 'MMM d, yyyy')}
                  </p>
                </div>
              </div>

              {issue.purpose && (
                <div className="mb-3">
                  <span className="text-xs text-gray-600 dark:text-gray-400">Purpose: </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {issue.purpose}
                  </span>
                </div>
              )}

              {issue.odometerReading && (
                <div className="mb-3">
                  <span className="text-xs text-gray-600 dark:text-gray-400">Odometer: </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {issue.odometerReading} km
                  </span>
                </div>
              )}

              {issue.reconciled && issue.reconciledDate && (
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <span className="text-gray-600 dark:text-gray-400">Reconciled on </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {format(new Date(issue.reconciledDate), 'MMM d, yyyy')}
                    </span>
                    {issue.reconciledBy && (
                      <>
                        <span className="text-gray-600 dark:text-gray-400">by </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {issue.reconciledBy}
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
