import { motion } from 'framer-motion'
import { ClipboardCheck, Calendar, MapPin, Droplet, Users, UserCheck, Cloud, CheckCircle, XCircle } from 'lucide-react'
import { FertilizerApplication } from '../../types'
import { mockFertilizerApplications, getAllFields } from '../../mock/data'
import { format } from 'date-fns'

export default function ApplicationCapture() {
  const fields = getAllFields()

  return (
    <div className="glass-panel p-6">
      <div className="flex items-center gap-3 mb-4">
        <ClipboardCheck className="w-6 h-6 text-primary-600 dark:text-primary-400" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Application Capture</h3>
      </div>

      <div className="space-y-4">
        {mockFertilizerApplications.map((app) => {
          const field = fields.find(f => f.id === app.fieldId)
          return (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl border ${
                app.status === 'completed'
                  ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20'
                  : 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Droplet className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{app.product}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {field?.name || `Field ${app.fieldId}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {app.weatherCheck.passed ? (
                    <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                  )}
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                    app.status === 'completed'
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                      : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                  }`}>
                    {app.status === 'completed' ? 'Completed' : 'Pending Validation'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-3">
                <div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-xs">Date</span>
                  </div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {format(new Date(app.date), 'MMM d, yyyy')}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                    <Droplet className="w-4 h-4" />
                    <span className="text-xs">Rate</span>
                  </div>
                  <p className="font-medium text-gray-900 dark:text-white">{app.rate} kg/ha</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                    <Users className="w-4 h-4" />
                    <span className="text-xs">Labour</span>
                  </div>
                  <p className="font-medium text-gray-900 dark:text-white">{app.labour.length} workers</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                    <UserCheck className="w-4 h-4" />
                    <span className="text-xs">Supervisor</span>
                  </div>
                  <p className="font-medium text-gray-900 dark:text-white">{app.supervisor}</p>
                </div>
              </div>

              {/* Weather Constraints Check */}
              <div className={`p-3 rounded-lg mb-3 ${
                app.weatherCheck.passed
                  ? 'bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                  : 'bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <Cloud className={`w-4 h-4 ${
                    app.weatherCheck.passed
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`} />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Weather Constraints Check: {app.weatherCheck.passed ? 'Passed' : 'Failed'}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                  {app.weatherCheck.temperature !== undefined && (
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Temperature: </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {app.weatherCheck.temperature}°C
                      </span>
                    </div>
                  )}
                  {app.weatherCheck.rainfall !== undefined && (
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Rainfall: </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {app.weatherCheck.rainfall} mm
                      </span>
                    </div>
                  )}
                  {app.weatherCheck.windSpeed !== undefined && (
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Wind Speed: </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {app.weatherCheck.windSpeed} km/h
                      </span>
                    </div>
                  )}
                </div>
                {app.weatherCheck.notes && (
                  <p className="text-xs text-gray-700 dark:text-gray-300 mt-2">
                    {app.weatherCheck.notes}
                  </p>
                )}
              </div>

              {/* Labour Details */}
              <div className="mb-3">
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Labour Team:</div>
                <div className="flex flex-wrap gap-2">
                  {app.labour.map((worker, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 rounded-lg text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    >
                      {worker}
                    </span>
                  ))}
                </div>
              </div>

              {app.batchNumber && (
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-xs text-gray-600 dark:text-gray-400">Batch Number: </span>
                  <span className="font-medium text-gray-900 dark:text-white">{app.batchNumber}</span>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
