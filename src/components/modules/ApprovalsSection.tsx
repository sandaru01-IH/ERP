import { motion } from 'framer-motion'
import { ShoppingCart, Calendar, Clock, FlaskConical, Check, X, AlertCircle } from 'lucide-react'
import { Approval } from '../../types'
import { mockApprovals } from '../../mock/data'
import { useState } from 'react'
import { format } from 'date-fns'

const approvalIcons = {
  purchase: ShoppingCart,
  work_plan: Calendar,
  overtime: Clock,
  chemical: FlaskConical,
}

const priorityColors = {
  low: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
  medium: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
  high: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
}

export default function ApprovalsSection() {
  const [approvals, setApprovals] = useState<Approval[]>(mockApprovals)

  const handleApprove = (id: string) => {
    setApprovals(approvals.map(approval =>
      approval.id === id ? { ...approval, status: 'approved' as const } : approval
    ))
  }

  const handleReject = (id: string) => {
    setApprovals(approvals.map(approval =>
      approval.id === id ? { ...approval, status: 'rejected' as const } : approval
    ))
  }

  const pendingApprovals = approvals.filter(a => a.status === 'pending')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Approvals</h3>
        <span className="px-3 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-sm font-medium">
          {pendingApprovals.length} Pending
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Purchase Requests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <ShoppingCart className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            <h4 className="font-semibold text-gray-900 dark:text-white">Purchase Requests</h4>
          </div>
          <div className="space-y-3">
            {pendingApprovals.filter(a => a.type === 'purchase').map((approval) => {
              const Icon = approvalIcons[approval.type]
              return (
                <div
                  key={approval.id}
                  className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      <p className="font-medium text-gray-900 dark:text-white">{approval.title}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-lg text-xs ${priorityColors[approval.priority]}`}>
                      {approval.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{approval.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500 dark:text-gray-500">
                      <p>By: {approval.requestedBy}</p>
                      <p>{format(new Date(approval.requestedDate), 'MMM d, yyyy')}</p>
                      {approval.amount && <p className="font-semibold mt-1">Rs {approval.amount.toLocaleString()}</p>}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(approval.id)}
                        className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                        aria-label="Approve"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleReject(approval.id)}
                        className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                        aria-label="Reject"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Work Plans */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            <h4 className="font-semibold text-gray-900 dark:text-white">Work Plans (Weekly/Monthly)</h4>
          </div>
          <div className="space-y-3">
            {pendingApprovals.filter(a => a.type === 'work_plan').map((approval) => {
              const Icon = approvalIcons[approval.type]
              return (
                <div
                  key={approval.id}
                  className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      <p className="font-medium text-gray-900 dark:text-white">{approval.title}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-lg text-xs ${priorityColors[approval.priority]}`}>
                      {approval.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{approval.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500 dark:text-gray-500">
                      <p>By: {approval.requestedBy}</p>
                      <p>{format(new Date(approval.requestedDate), 'MMM d, yyyy')}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(approval.id)}
                        className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                        aria-label="Approve"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleReject(approval.id)}
                        className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                        aria-label="Reject"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Overtime / Extra Labour */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            <h4 className="font-semibold text-gray-900 dark:text-white">Overtime / Extra Labour</h4>
          </div>
          <div className="space-y-3">
            {pendingApprovals.filter(a => a.type === 'overtime').map((approval) => {
              const Icon = approvalIcons[approval.type]
              return (
                <div
                  key={approval.id}
                  className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      <p className="font-medium text-gray-900 dark:text-white">{approval.title}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-lg text-xs ${priorityColors[approval.priority]}`}>
                      {approval.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{approval.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500 dark:text-gray-500">
                      <p>By: {approval.requestedBy}</p>
                      <p>{format(new Date(approval.requestedDate), 'MMM d, yyyy')}</p>
                      {approval.amount && <p className="font-semibold mt-1">Rs {approval.amount.toLocaleString()}</p>}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(approval.id)}
                        className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                        aria-label="Approve"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleReject(approval.id)}
                        className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                        aria-label="Reject"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Chemical Issues & Spray Approvals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-panel p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <FlaskConical className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            <h4 className="font-semibold text-gray-900 dark:text-white">Chemical Issues & Spray Approvals</h4>
          </div>
          <div className="space-y-3">
            {pendingApprovals.filter(a => a.type === 'chemical').map((approval) => {
              const Icon = approvalIcons[approval.type]
              return (
                <div
                  key={approval.id}
                  className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      <p className="font-medium text-gray-900 dark:text-white">{approval.title}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-lg text-xs ${priorityColors[approval.priority]}`}>
                      {approval.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{approval.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500 dark:text-gray-500">
                      <p>By: {approval.requestedBy}</p>
                      <p>{format(new Date(approval.requestedDate), 'MMM d, yyyy')}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(approval.id)}
                        className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                        aria-label="Approve"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleReject(approval.id)}
                        className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                        aria-label="Reject"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
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
