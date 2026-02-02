import { motion } from 'framer-motion'
import { FileText, TrendingUp, Users, Download } from 'lucide-react'
import { Report } from '../../types'
import { mockReports } from '../../mock/data'
import { format } from 'date-fns'

export default function ReportsSection() {
  const handleDownload = (reportId: string) => {
    console.log('Downloading report:', reportId)
    // In a real app, this would trigger a download
  }

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Reports</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Estate Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            <h4 className="font-semibold text-gray-900 dark:text-white">Estate Performance</h4>
          </div>
          <div className="space-y-3">
            {mockReports.filter(r => r.type === 'estate_performance').map((report) => (
              <div
                key={report.id}
                className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
              >
                <p className="font-medium text-gray-900 dark:text-white mb-1">{report.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Period: {report.period}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-500">
                    {format(new Date(report.generatedDate), 'MMM d, yyyy')}
                  </span>
                  <button
                    onClick={() => handleDownload(report.id)}
                    className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors"
                    aria-label="Download report"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Field Productivity Ranking */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            <h4 className="font-semibold text-gray-900 dark:text-white">Field Productivity Ranking</h4>
          </div>
          <div className="space-y-3">
            {mockReports.filter(r => r.type === 'field_productivity').map((report) => (
              <div
                key={report.id}
                className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
              >
                <p className="font-medium text-gray-900 dark:text-white mb-1">{report.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Period: {report.period}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-500">
                    {format(new Date(report.generatedDate), 'MMM d, yyyy')}
                  </span>
                  <button
                    onClick={() => handleDownload(report.id)}
                    className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors"
                    aria-label="Download report"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Labour Efficiency */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            <h4 className="font-semibold text-gray-900 dark:text-white">Labour Efficiency</h4>
          </div>
          <div className="space-y-3">
            {mockReports.filter(r => r.type === 'labour_efficiency').map((report) => (
              <div
                key={report.id}
                className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
              >
                <p className="font-medium text-gray-900 dark:text-white mb-1">{report.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Period: {report.period}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-500">
                    {format(new Date(report.generatedDate), 'MMM d, yyyy')}
                  </span>
                  <button
                    onClick={() => handleDownload(report.id)}
                    className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors"
                    aria-label="Download report"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
