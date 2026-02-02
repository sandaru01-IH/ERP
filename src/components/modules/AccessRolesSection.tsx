import { motion } from 'framer-motion'
import { User, Eye, CheckCircle, FileText, Settings, ClipboardList } from 'lucide-react'

const roles = [
  {
    id: 'director',
    title: 'Directors / GM',
    description: 'View-only + approvals + reports',
    icon: User,
    permissions: ['View all data', 'Approve budgets', 'View reports', 'Executive dashboards'],
    color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  },
  {
    id: 'estate-manager',
    title: 'Estate Manager',
    description: 'View + approve plans, budgets',
    icon: Settings,
    permissions: ['View estate data', 'Approve plans', 'Approve budgets', 'Manage teams'],
    color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  },
  {
    id: 'superintendent',
    title: 'Superintendents',
    description: 'Create + submit daily ops',
    icon: ClipboardList,
    permissions: ['Create tickets', 'Submit daily ops', 'Monitor fields', 'Assign tasks'],
    color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
  },
  {
    id: 'storekeeper',
    title: 'Storekeepers / Operators / Labour',
    description: 'Minimal view (tasks only)',
    icon: Eye,
    permissions: ['View assigned tasks', 'Confirm completion', 'View inventory (storekeepers)'],
    color: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
  },
]

export default function AccessRolesSection() {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Access & Operation Roles</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {roles.map((role, index) => {
          const Icon = role.icon
          return (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-panel p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-3 rounded-xl ${role.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{role.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{role.description}</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Permissions:</p>
                {role.permissions.map((permission, permIndex) => (
                  <div key={permIndex} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <CheckCircle className="w-4 h-4 text-primary-600 dark:text-primary-400" />
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
