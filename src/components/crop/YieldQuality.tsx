import { motion } from 'framer-motion'
import { TrendingUp, Award, Beaker, Package } from 'lucide-react'
import { YieldRecord } from '../../types'
import { mockYieldRecords, getAllFields } from '../../mock/data'
import { format } from 'date-fns'

export default function YieldQuality() {
  const fields = getAllFields()

  return (
    <div className="glass-panel p-6">
      <div className="flex items-center gap-3 mb-4">
        <TrendingUp className="w-6 h-6 text-primary-600 dark:text-primary-400" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Yield & Quality</h3>
      </div>

      {/* Field-wise Yield Capture */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Field-wise Yield Capture</h4>
        <div className="space-y-3">
          {mockYieldRecords.map((record) => {
            const field = fields.find(f => f.id === record.fieldId)
            return (
              <motion.div
                key={record.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{field?.name || `Field ${record.fieldId}`}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {format(new Date(record.date), 'MMM d, yyyy')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                      {record.yield.toLocaleString()} {record.unit}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Quality Metrics */}
      <div>
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Quality Metrics</h4>
        <div className="space-y-3">
          {mockYieldRecords.filter(r => r.qualityMetrics).map((record) => {
            const metrics = record.qualityMetrics!
            return (
              <motion.div
                key={record.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Package className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {fields.find(f => f.id === record.fieldId)?.name || `Field ${record.fieldId}`}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {metrics.teaLeafStandard && (
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Tea Leaf Standard</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{metrics.teaLeafStandard}</p>
                      </div>
                    </div>
                  )}
                  {metrics.latexDRC !== undefined && (
                    <div className="flex items-center gap-2">
                      <Beaker className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Latex DRC</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{metrics.latexDRC}%</p>
                      </div>
                    </div>
                  )}
                  {metrics.fruitBunchGrading && (
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Fruit Bunch Grading</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{metrics.fruitBunchGrading}</p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
