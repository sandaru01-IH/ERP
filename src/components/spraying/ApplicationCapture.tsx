import { motion } from 'framer-motion'
import { ClipboardCheck, MapPin, User, Calendar, CheckCircle, AlertTriangle, XCircle, Cloud } from 'lucide-react'
import { ApplicationCapture } from '../../types'
import { mockApplicationCaptures, getAllFields } from '../../mock/data'
import { format } from 'date-fns'

export default function ApplicationCaptureComponent() {
  const fields = getAllFields()

  const getFieldName = (fieldId: string) => {
    const field = fields.find((f) => f.id === fieldId)
    return field?.name || `Field ${fieldId}`
  }

  const getChecklistStatusColor = (status: string) => {
    switch (status) {
      case 'ok':
        return 'text-green-600 dark:text-green-400'
      case 'missing':
        return 'text-red-600 dark:text-red-400'
      case 'damaged':
        return 'text-yellow-600 dark:text-yellow-400'
      default:
        return 'text-gray-600 dark:text-gray-400'
    }
  }

  return (
    <div className="glass-panel p-6">
      <div className="flex items-center gap-3 mb-4">
        <ClipboardCheck className="w-6 h-6 text-primary-600 dark:text-primary-400" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Application Capture</h3>
      </div>

      <div className="space-y-4">
        {mockApplicationCaptures.map((capture) => (
          <motion.div
            key={capture.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {capture.chemical} - {capture.target}
                </p>
                <div className="flex items-center gap-2 mt-1 text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>{getFieldName(capture.fieldId)}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-primary-600 dark:text-primary-400">
                  {capture.areaCovered} {capture.areaUnit}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-3">
              <div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1 text-xs">
                  <Calendar className="w-4 h-4" />
                  <span>Date</span>
                </div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {format(new Date(capture.applicationDate), 'MMM d, yyyy')}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1 text-xs">
                  <User className="w-4 h-4" />
                  <span>Operator</span>
                </div>
                <p className="font-medium text-gray-900 dark:text-white">{capture.operator}</p>
              </div>
              {capture.supervisor && (
                <div>
                  <div className="text-gray-600 dark:text-gray-400 mb-1 text-xs">Supervisor</div>
                  <p className="font-medium text-gray-900 dark:text-white">{capture.supervisor}</p>
                </div>
              )}
              <div>
                <div className="text-gray-600 dark:text-gray-400 mb-1 text-xs">Mix Rate</div>
                <p className="font-medium text-gray-900 dark:text-white">{capture.mixRate}</p>
              </div>
            </div>

            {capture.weather && (
              <div className="mb-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-center gap-2 mb-2">
                  <Cloud className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                  <span className="text-xs font-medium text-gray-900 dark:text-white">Weather</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                  {capture.weather.temperature && (
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Temp: </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {capture.weather.temperature}°C
                      </span>
                    </div>
                  )}
                  {capture.weather.humidity && (
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Humidity: </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {capture.weather.humidity}%
                      </span>
                    </div>
                  )}
                  {capture.weather.windSpeed && (
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Wind: </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {capture.weather.windSpeed} km/h
                      </span>
                    </div>
                  )}
                  {capture.weather.conditions && (
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Conditions: </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {capture.weather.conditions}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {capture.ppeChecklist && (
              <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  {capture.ppeChecklist.completed ? (
                    <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                  )}
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    PPE Checklist
                  </span>
                </div>
                <div className="space-y-1">
                  {capture.ppeChecklist.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between text-xs p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50"
                    >
                      <span className="text-gray-700 dark:text-gray-300">{item.name}</span>
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-medium capitalize ${getChecklistStatusColor(item.status)}`}
                        >
                          {item.status}
                        </span>
                        {item.notes && (
                          <span className="text-gray-500 dark:text-gray-500 text-xs">
                            ({item.notes})
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {capture.notes && (
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-700 dark:text-gray-300">{capture.notes}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
