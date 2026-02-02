import { motion } from 'framer-motion'
import { Sprout, Package, TrendingUp, AlertTriangle, X } from 'lucide-react'
import { FieldProfile } from '../../types/geo'
import { mockFieldProfiles } from '../../mock/data'
import { format } from 'date-fns'

interface FieldProfileProps {
  fieldId: string | null
  onClose: () => void
}

export default function FieldProfilePanel({ fieldId, onClose }: FieldProfileProps) {
  if (!fieldId) return null

  const profile = mockFieldProfiles.find(p => p.fieldId === fieldId)

  if (!profile) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass-panel p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Field Profile</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-gray-600 dark:text-gray-400">No profile data available for this field.</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-panel p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Field Profile</h3>
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Crop & Age */}
      {profile.crop && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Sprout className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            <h4 className="font-semibold text-gray-900 dark:text-white">Crop & Age</h4>
          </div>
          <div className="p-4 rounded-xl bg-primary-50 dark:bg-primary-900/20">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Type</p>
            <p className="font-medium text-gray-900 dark:text-white">{profile.crop.type}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 mb-1">Variety</p>
            <p className="font-medium text-gray-900 dark:text-white">{profile.crop.variety}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 mb-1">Age</p>
            <p className="font-medium text-gray-900 dark:text-white">{profile.crop.age} years</p>
          </div>
        </div>
      )}

      {/* Input History */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Package className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          <h4 className="font-semibold text-gray-900 dark:text-white">Input History</h4>
        </div>
        <div className="space-y-2">
          {profile.inputHistory.map((input, index) => (
            <div key={index} className="p-3 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-900 dark:text-white">{input.product}</span>
                <span className={`text-xs px-2 py-1 rounded-lg ${
                  input.type === 'fertilizer' 
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                    : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
                }`}>
                  {input.type}
                </span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {input.quantity} {input.type === 'fertilizer' ? 'kg' : 'L'} • {format(new Date(input.date), 'MMM d, yyyy')}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Yield History */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          <h4 className="font-semibold text-gray-900 dark:text-white">Yield History</h4>
        </div>
        <div className="space-y-2">
          {profile.yieldHistory.map((yieldData, index) => (
            <div key={index} className="p-3 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {format(new Date(yieldData.date), 'MMM d, yyyy')}
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {yieldData.yield.toLocaleString()} {yieldData.unit}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Issues */}
      {profile.issues.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
            <h4 className="font-semibold text-gray-900 dark:text-white">Issues</h4>
          </div>
          <div className="space-y-2">
            {profile.issues.map((issue, index) => (
              <div key={index} className="p-3 rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">{issue.type}</span>
                  <span className={`text-xs px-2 py-1 rounded-lg ${
                    issue.severity === 'high' 
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                      : issue.severity === 'medium'
                      ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
                  }`}>
                    {issue.severity}
                  </span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{issue.description}</p>
                <p className="text-xs text-gray-500 dark:text-gray-500">{format(new Date(issue.date), 'MMM d, yyyy')}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}
