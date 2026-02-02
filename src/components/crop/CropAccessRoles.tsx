import { motion } from 'framer-motion'
import { User, Eye, Settings, ClipboardList, CheckCircle } from 'lucide-react'

const roles = [
  {
    id: 'director',
    title: 'Directors / GM',
    description: 'View KPI dashboards',
    icon: User,
    permissions: ['View KPI dashboards', 'View crop reports', 'Access analytics'],
    color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  },
  {
    id: 'estate-manager',
    title: 'Estate Manager',
    description: 'View + approve programs + review outcomes',
    icon: Settings,
    permissions: ['View crop data', 'Approve programs', 'Review outcomes', 'Approve calendar operations'],
    color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  },
  {
    id: 'superintendent',
    title: 'Superintendents / Field Officers',
    description: 'Create / update crop records, logs and observations',
    icon: ClipboardList,
    permissions: ['Create crop records', 'Update crop logs', 'Add observations', 'Update calendar', 'Record activities'],
    color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
  },
  {
    id: 'labour',
    title: 'Labour',
    description: 'Only assigned tasks + completion confirmation (mobile)',
    icon: Eye,
    permissions: ['View assigned tasks', 'Confirm task completion', 'Mobile access only'],
    color: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
  },
]

export default function CropAccessRoles() {
  return (
    <div className="glass-panel p-6">
      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Access & Operation Roles</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {roles.map((role, index) => {
          const Icon = role.icon
          return (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-xl border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg ${role.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{role.title}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{role.description}</p>
                </div>
              </div>
              <div className="space-y-1">
                {role.permissions.map((permission, permIndex) => (
                  <div key={permIndex} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                    <CheckCircle className="w-3 h-3 text-primary-600 dark:text-primary-400" />
                    <span>{permission}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
