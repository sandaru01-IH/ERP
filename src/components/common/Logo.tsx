import { motion } from 'framer-motion'
import { useState } from 'react'

interface LogoProps {
  className?: string
  collapsed?: boolean
}

export default function Logo({ className = '', collapsed = false }: LogoProps) {
  const [imageError, setImageError] = useState(false)
  const logoSrc = '/logo.png' // Place logo.png in public folder
  
  // If image fails to load, show text logo
  if (imageError) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`flex items-center gap-2 ${className}`}
      >
        <span className="text-1.5xl md:text-1.5xl font-bold text-gray-800 dark:text-gray-200">SPÅTIAL</span>
        <span className="text-1.5xl md:text-1.5xl font-bold text-primary-600 dark:text-primary-400">Agri</span>
      </motion.div>
    )
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`flex items-center ${className}`}
    >
      <img
        src={logoSrc}
        alt="SPÅTIAL Agri"
        className={`${collapsed ? 'h-16 w-16' : 'h-16 w-auto md:h-20 md:w-auto'} object-contain`}
        onError={() => setImageError(true)}
      />
    </motion.div>
  )
}
