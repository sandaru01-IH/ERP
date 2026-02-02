import { motion } from 'framer-motion'
import { Calendar, Droplet, TestTube, MapPin, Leaf } from 'lucide-react'
import { FertilizerProgram as FertilizerProgramType, FertilizerRecommendation } from '../../types'
import { mockFertilizerPrograms, mockFertilizerRecommendations, getAllFields } from '../../mock/data'
import { format } from 'date-fns'

export default function FertilizerProgram() {
  const fields = getAllFields()

  return (
    <div className="space-y-6">
      {/* Recommendations Section */}
      <div className="glass-panel p-6">
        <div className="flex items-center gap-3 mb-4">
          <TestTube className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Recommendations per Field</h3>
        </div>
        <div className="space-y-4">
          {mockFertilizerRecommendations.map((rec) => {
            const field = fields.find(f => f.id === rec.fieldId)
            return (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Droplet className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{rec.product}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {field?.name || `Field ${rec.fieldId}`}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary-600 dark:text-primary-400">
                      {rec.recommendedRate} kg/ha
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                  <div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                      <MapPin className="w-4 h-4" />
                      <span className="text-xs">Basis</span>
                    </div>
                    <p className="font-medium text-gray-900 dark:text-white capitalize">
                      {rec.basis.replace('_', ' ')}
                    </p>
                  </div>
                  {rec.soilTestDate && (
                    <div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                        <Calendar className="w-4 h-4" />
                        <span className="text-xs">Soil Test Date</span>
                      </div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {format(new Date(rec.soilTestDate), 'MMM d, yyyy')}
                      </p>
                    </div>
                  )}
                  {rec.zone && (
                    <div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                        <Leaf className="w-4 h-4" />
                        <span className="text-xs">Zone</span>
                      </div>
                      <p className="font-medium text-gray-900 dark:text-white">{rec.zone}</p>
                    </div>
                  )}
                  {rec.cropAge && (
                    <div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                        <span className="text-xs">Crop Age</span>
                      </div>
                      <p className="font-medium text-gray-900 dark:text-white">{rec.cropAge} years</p>
                    </div>
                  )}
                </div>

                {rec.notes && (
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-700 dark:text-gray-300">{rec.notes}</p>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Schedule Section */}
      <div className="glass-panel p-6">
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Schedule (Round 1 / 2 / 3)</h3>
        </div>
        <div className="space-y-4">
          {mockFertilizerPrograms.map((program) => {
            const field = fields.find(f => f.id === program.fieldId)
            return (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl border ${
                  program.status === 'applied'
                    ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20'
                    : program.status === 'planned'
                    ? 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Droplet className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{program.product}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {field?.name || `Field ${program.fieldId}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                      program.status === 'applied'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                        : program.status === 'planned'
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
                    }`}>
                      {program.status}
                    </span>
                    <span className="px-2 py-1 rounded-lg text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400">
                      Round {program.round}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                      <Calendar className="w-4 h-4" />
                      <span className="text-xs">Scheduled Date</span>
                    </div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {format(new Date(program.scheduledDate), 'MMM d, yyyy')}
                    </p>
                  </div>
                  {program.appliedDate && (
                    <div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                        <span className="text-xs">Applied Date</span>
                      </div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {format(new Date(program.appliedDate), 'MMM d, yyyy')}
                      </p>
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                      <span className="text-xs">Dose</span>
                    </div>
                    <p className="font-medium text-gray-900 dark:text-white">{program.dose} kg/ha</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                      <span className="text-xs">Cost</span>
                    </div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      LKR {program.cost.toLocaleString()}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
