import { motion } from 'framer-motion'
import { TestTube, FlaskConical, FileText, CheckCircle, Clock, Beaker } from 'lucide-react'
import { SoilLeafTest } from '../../types'
import { mockSoilLeafTests, getAllFields } from '../../mock/data'
import { format } from 'date-fns'

export default function SoilLeafTests() {
  const fields = getAllFields()

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'recommendations_applied':
        return CheckCircle
      case 'results_received':
        return FileText
      case 'sampled':
        return Beaker
      case 'planned':
        return Clock
      default:
        return Clock
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'recommendations_applied':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
      case 'results_received':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
      case 'sampled':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
      case 'planned':
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
    }
  }

  const getParameterStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'text-green-600 dark:text-green-400'
      case 'low':
      case 'deficient':
        return 'text-red-600 dark:text-red-400'
      case 'high':
        return 'text-orange-600 dark:text-orange-400'
      default:
        return 'text-gray-600 dark:text-gray-400'
    }
  }

  return (
    <div className="glass-panel p-6">
      <div className="flex items-center gap-3 mb-4">
        <TestTube className="w-6 h-6 text-primary-600 dark:text-primary-400" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Soil & Leaf Tests</h3>
      </div>

      <div className="space-y-4">
        {mockSoilLeafTests.map((test) => {
          const field = fields.find(f => f.id === test.fieldId)
          const StatusIcon = getStatusIcon(test.status)
          return (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  {test.type === 'soil' ? (
                    <FlaskConical className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  ) : (
                    <TestTube className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  )}
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white capitalize">
                      {test.type} Test
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {field?.name || `Field ${test.fieldId}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <StatusIcon className={`w-4 h-4 ${getStatusColor(test.status).split(' ')[1]}`} />
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium capitalize ${getStatusColor(test.status)}`}>
                    {test.status.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {/* Sample Plan */}
              <div className="mb-3">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
                  <FileText className="w-4 h-4" />
                  <span className="text-sm font-medium">Sample Plan</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400 text-xs">Date: </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {format(new Date(test.samplePlan.date), 'MMM d, yyyy')}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400 text-xs">Samples: </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {test.samplePlan.samples}
                    </span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-gray-600 dark:text-gray-400 text-xs">Locations: </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {test.samplePlan.locations.map((location, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 rounded-lg text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                      >
                        {location}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Lab Results */}
              {test.labResults && (
                <div className="mb-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Lab Results</span>
                    <span className="text-xs">
                      ({format(new Date(test.labResults.date), 'MMM d, yyyy')})
                    </span>
                  </div>
                  <div className="space-y-2">
                    {test.labResults.parameters.map((param, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50 text-sm"
                      >
                        <div>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {param.name}
                          </span>
                          <span className="text-gray-600 dark:text-gray-400 ml-2">
                            {param.value} {param.unit}
                          </span>
                        </div>
                        <span
                          className={`text-xs font-medium capitalize ${getParameterStatusColor(param.status)}`}
                        >
                          {param.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendations */}
              {test.recommendations && test.recommendations.length > 0 && (
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
                    <span className="text-sm font-medium">Recommendations:</span>
                  </div>
                  <ul className="space-y-1">
                    {test.recommendations.map((rec, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-600 dark:bg-primary-400 mt-1.5 flex-shrink-0" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
