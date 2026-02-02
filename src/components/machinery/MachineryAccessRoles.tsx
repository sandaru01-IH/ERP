import { motion } from 'framer-motion'
import { Shield, Eye, CheckCircle, Edit, Wrench, ClipboardList, Package } from 'lucide-react'

const roles = [
  {
    role: 'Directors / GM',
    icon: Eye,
    permissions: ['View CAPEX', 'Utilization', 'High-level costs'],
    color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  },
  {
    role: 'Estate Manager',
    icon: CheckCircle,
    permissions: ['Approve allocations and repair spend'],
    color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  },
  {
    role: 'Superintendent',
    icon: Edit,
    permissions: ['Request / plan machinery usage'],
    color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
  },
  {
    role: 'Mechanical Engineer / Workshop Officer',
    icon: Wrench,
    permissions: ['Full maintenance control'],
    color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
  },
  {
    role: 'Drivers / Operators',
    icon: ClipboardList,
    permissions: ['Daily log entry', 'Pre-start checklist (mobile)'],
    color: 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400',
  },
  {
    role: 'Storekeeper',
    icon: Package,
    permissions: ['Spares issue', 'Fuel issue (if store owns fuel)'],
    color: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400',
  },
]

export default function MachineryAccessRoles() {
  return (
    <div className="glass-panel p-6">
      <div className="flex items-center gap-3 mb-4">
        <Shield className="w-6 h-6 text-primary-600 dark:text-primary-400" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Access & Operation Roles</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {roles.map((role, index) => {
          const Icon = role.icon
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg ${role.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{role.role}</h4>
              </div>
              <ul className="space-y-2">
                {role.permissions.map((permission, permIndex) => (
                  <li
                    key={permIndex}
                    className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-600 dark:bg-primary-400 mt-1.5 flex-shrink-0" />
                    <span>{permission}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
