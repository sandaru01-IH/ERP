import { motion } from 'framer-motion'
import { AlertTriangle, Package, Wrench, CloudRain, ShieldAlert, CheckCircle, X } from 'lucide-react'
import { Alert } from '../../types'
import { mockAlerts } from '../../mock/data'
import { useState } from 'react'

const alertIcons = {
  low_stock: Package,
  maintenance: Wrench,
  weather: CloudRain,
  compliance: ShieldAlert,
}

const alertColors = {
  low_stock: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700',
  maintenance: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-300 dark:border-orange-700',
  weather: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-700',
  compliance: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-300 dark:border-red-700',
}

const severityColors = {
  low: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
  medium: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
  high: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
}

export default function AlertsSection() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts)

  const handleResolve = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, status: 'resolved' as const } : alert
    ))
  }

  const activeAlerts = alerts.filter(a => a.status === 'active')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Alerts & Exceptions</h3>
        <span className="px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-sm font-medium">
          {activeAlerts.length} Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Low Stock */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Package className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            <h4 className="font-semibold text-gray-900 dark:text-white">Low Stock</h4>
          </div>
          <div className="space-y-3">
            {activeAlerts.filter(a => a.type === 'low_stock').map((alert) => {
              const Icon = alertIcons[alert.type]
              return (
                <div
                  key={alert.id}
                  className={`p-4 rounded-xl border ${alertColors[alert.type]}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-4 h-4" />
                        <p className="font-medium">{alert.title}</p>
                      </div>
                      <p className="text-sm opacity-90">{alert.description}</p>
                      {alert.category && (
                        <span className="inline-block mt-2 px-2 py-1 rounded-lg text-xs bg-white/50 dark:bg-black/20">
                          {alert.category}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleResolve(alert.id)}
                      className="ml-2 p-1 rounded-lg hover:bg-white/20 transition-colors"
                      aria-label="Resolve alert"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Overdue Maintenance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Wrench className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            <h4 className="font-semibold text-gray-900 dark:text-white">Overdue Maintenance</h4>
          </div>
          <div className="space-y-3">
            {activeAlerts.filter(a => a.type === 'maintenance').map((alert) => {
              const Icon = alertIcons[alert.type]
              return (
                <div
                  key={alert.id}
                  className={`p-4 rounded-xl border ${alertColors[alert.type]}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-4 h-4" />
                        <p className="font-medium">{alert.title}</p>
                      </div>
                      <p className="text-sm opacity-90">{alert.description}</p>
                    </div>
                    <button
                      onClick={() => handleResolve(alert.id)}
                      className="ml-2 p-1 rounded-lg hover:bg-white/20 transition-colors"
                      aria-label="Resolve alert"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Weather Risk Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <CloudRain className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h4 className="font-semibold text-gray-900 dark:text-white">Weather Risk Alerts</h4>
          </div>
          <div className="space-y-3">
            {activeAlerts.filter(a => a.type === 'weather').map((alert) => {
              const Icon = alertIcons[alert.type]
              return (
                <div
                  key={alert.id}
                  className={`p-4 rounded-xl border ${alertColors[alert.type]}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-4 h-4" />
                        <p className="font-medium">{alert.title}</p>
                        <span className={`px-2 py-1 rounded-lg text-xs ${severityColors[alert.severity]}`}>
                          {alert.severity}
                        </span>
                      </div>
                      <p className="text-sm opacity-90">{alert.description}</p>
                    </div>
                    <button
                      onClick={() => handleResolve(alert.id)}
                      className="ml-2 p-1 rounded-lg hover:bg-white/20 transition-colors"
                      aria-label="Resolve alert"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Compliance Incidents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-panel p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <ShieldAlert className="w-5 h-5 text-red-600 dark:text-red-400" />
            <h4 className="font-semibold text-gray-900 dark:text-white">Compliance Incidents</h4>
          </div>
          <div className="space-y-3">
            {activeAlerts.filter(a => a.type === 'compliance').map((alert) => {
              const Icon = alertIcons[alert.type]
              return (
                <div
                  key={alert.id}
                  className={`p-4 rounded-xl border ${alertColors[alert.type]}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-4 h-4" />
                        <p className="font-medium">{alert.title}</p>
                        <span className={`px-2 py-1 rounded-lg text-xs ${severityColors[alert.severity]}`}>
                          {alert.severity}
                        </span>
                      </div>
                      <p className="text-sm opacity-90">{alert.description}</p>
                    </div>
                    <button
                      onClick={() => handleResolve(alert.id)}
                      className="ml-2 p-1 rounded-lg hover:bg-white/20 transition-colors"
                      aria-label="Resolve alert"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
