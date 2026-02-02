import { motion } from 'framer-motion'
import { AlertTriangle, Bug, Activity, CheckCircle } from 'lucide-react'
import { PestDisease as PestDiseaseType } from '../../types'
import { mockPestDiseases, getAllFields } from '../../mock/data'
import { format } from 'date-fns'

export default function PestDisease() {
  const fields = getAllFields()

  return (
    <div className="glass-panel p-6">
      <div className="flex items-center gap-3 mb-4">
        <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Pest / Disease</h3>
      </div>

      <div className="space-y-4">
        {mockPestDiseases.map((item) => {
          const field = fields.find(f => f.id === item.fieldId)
          const Icon = item.type === 'pest' ? Bug : Activity
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl border ${
                item.status === 'resolved'
                  ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20'
                  : 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${
                    item.type === 'pest' 
                      ? 'text-orange-600 dark:text-orange-400'
                      : 'text-red-600 dark:text-red-400'
                  }`} />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{item.name}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {field?.name || `Field ${item.fieldId}`} • {format(new Date(item.observationDate), 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {item.status === 'resolved' && (
                    <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                  )}
                  <span className={`text-xs px-2 py-1 rounded-lg font-medium ${
                    item.severity === 'high'
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                      : item.severity === 'medium'
                      ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
                  }`}>
                    {item.severity}
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{item.description}</p>

              {/* Observations */}
              <div className="mb-3">
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Observations:</p>
                <p className="text-sm text-gray-900 dark:text-white">{item.description}</p>
              </div>

              {/* Actions Taken */}
              {item.actionsTaken.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Actions Taken:</p>
                  <div className="space-y-1">
                    {item.actionsTaken.map((action, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-600 dark:bg-primary-400" />
                        <span>{action}</span>
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
