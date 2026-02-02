import { motion } from 'framer-motion'
import { ClipboardList, TrendingUp, DollarSign, Wrench, Users } from 'lucide-react'
import { mockWorkTickets, mockAssets, mockAttendance, mockProduction, mockCostSnapshots } from '../../mock/data'

export default function DashboardSection() {
  const today = new Date().toISOString().split('T')[0]
  const todayTickets = mockWorkTickets.filter(t => t.date === today)
  const activeMachines = mockAssets.filter(a => a.status === 'active' && a.assignments.some(ass => ass.status === 'active'))
  const todayAttendance = mockAttendance.filter(a => a.date === today)
  const todayProduction = mockProduction.filter(p => p.date === today)
  const todayCosts = mockCostSnapshots.filter(c => c.period === today)

  const totalPlucked = todayProduction.filter(p => p.pluckedKg).reduce((sum, p) => sum + (p.pluckedKg || 0), 0)
  const totalLatex = todayProduction.filter(p => p.latexKg).reduce((sum, p) => sum + (p.latexKg || 0), 0)
  const totalCost = todayCosts.reduce((sum, c) => sum + c.cost, 0)

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h3>
      
      {/* Today's Operations Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <ClipboardList className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Today's Operations Summary</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-primary-50 dark:bg-primary-900/20">
            <div className="flex items-center gap-2 mb-2">
              <ClipboardList className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Work Tickets</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{todayTickets.length}</p>
          </div>
          <div className="p-4 rounded-xl bg-accent-50 dark:bg-accent-900/20">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-accent-600 dark:text-accent-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Labour Deployed</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {todayAttendance.filter(a => a.status === 'present').length}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-highlight-50 dark:bg-highlight-900/20">
            <div className="flex items-center gap-2 mb-2">
              <Wrench className="w-5 h-5 text-highlight-600 dark:text-highlight-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Machines Active</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{activeMachines.length}</p>
          </div>
        </div>
      </motion.div>

      {/* Production */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-panel p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Production</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {totalPlucked > 0 && (
            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Plucked (kg)</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalPlucked.toLocaleString()}</p>
            </div>
          )}
          {totalLatex > 0 && (
            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Latex (kg)</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalLatex.toLocaleString()}</p>
            </div>
          )}
          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Harvest Outputs</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{todayProduction.length}</p>
          </div>
        </div>
      </motion.div>

      {/* Cost Snapshot */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-panel p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <DollarSign className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Cost Snapshot</h4>
        </div>
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Total Cost (Today)</span>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">Rs {totalCost.toLocaleString()}</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Job-wise Cost</p>
              <div className="space-y-2">
                {todayCosts.map((cost) => (
                  <div key={cost.id} className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{cost.jobType}</span>
                    <span className="font-semibold text-gray-900 dark:text-white">Rs {cost.cost.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Field-wise Cost</p>
              <div className="space-y-2">
                {todayCosts.map((cost) => (
                  <div key={cost.id} className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Field {cost.fieldId}</span>
                    <span className="font-semibold text-gray-900 dark:text-white">Rs {cost.cost.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
