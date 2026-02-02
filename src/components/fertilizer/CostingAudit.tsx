import { motion } from 'framer-motion'
import { DollarSign, TrendingUp, TrendingDown, Package, CheckCircle } from 'lucide-react'
import { FertilizerCosting } from '../../types'
import { mockFertilizerCosting, getAllFields } from '../../mock/data'

export default function CostingAudit() {
  const fields = getAllFields()

  return (
    <div className="glass-panel p-6">
      <div className="flex items-center gap-3 mb-4">
        <DollarSign className="w-6 h-6 text-primary-600 dark:text-primary-400" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Costing & Audit</h3>
      </div>

      <div className="space-y-4">
        {mockFertilizerCosting.map((cost) => {
          const field = fields.find(f => f.id === cost.fieldId)
          const isPositiveVariance = cost.variance >= 0
          const VarianceIcon = isPositiveVariance ? TrendingUp : TrendingDown

          return (
            <motion.div
              key={cost.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {field?.name || `Field ${cost.fieldId}`}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{cost.period}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    LKR {cost.actualCost.toLocaleString()}
                  </p>
                  <div className={`flex items-center gap-1 text-sm ${
                    isPositiveVariance
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-green-600 dark:text-green-400'
                  }`}>
                    <VarianceIcon className="w-4 h-4" />
                    <span>
                      {isPositiveVariance ? '+' : ''}{cost.variancePercent.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 text-sm">
                <div>
                  <div className="text-gray-600 dark:text-gray-400 mb-1 text-xs">Planned Cost</div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    LKR {cost.plannedCost.toLocaleString()}
                  </p>
                </div>
                <div>
                  <div className="text-gray-600 dark:text-gray-400 mb-1 text-xs">Actual Cost</div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    LKR {cost.actualCost.toLocaleString()}
                  </p>
                </div>
                <div>
                  <div className="text-gray-600 dark:text-gray-400 mb-1 text-xs">Variance</div>
                  <p className={`font-medium ${
                    isPositiveVariance
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-green-600 dark:text-green-400'
                  }`}>
                    {isPositiveVariance ? '+' : ''}LKR {Math.abs(cost.variance).toLocaleString()}
                  </p>
                </div>
                <div>
                  <div className="text-gray-600 dark:text-gray-400 mb-1 text-xs">Applications</div>
                  <p className="font-medium text-gray-900 dark:text-white">{cost.applications}</p>
                </div>
              </div>

              {/* Batch / Lot Traceability */}
              {cost.batchTraceability.length > 0 && (
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      Batch / Lot Traceability
                    </span>
                  </div>
                  <div className="space-y-2">
                    {cost.batchTraceability.map((batch, index) => (
                      <div
                        key={index}
                        className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50 text-sm"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-green-600 dark:text-green-400" />
                            <span className="font-medium text-gray-900 dark:text-white">
                              {batch.batchNumber}
                            </span>
                            <span className="text-gray-600 dark:text-gray-400">•</span>
                            <span className="text-gray-700 dark:text-gray-300">{batch.product}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-gray-600 dark:text-gray-400 text-xs">
                              {batch.quantity} kg
                            </span>
                            <span className="text-gray-600 dark:text-gray-400 mx-2">•</span>
                            <span className="font-medium text-gray-900 dark:text-white">
                              LKR {batch.cost.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
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
