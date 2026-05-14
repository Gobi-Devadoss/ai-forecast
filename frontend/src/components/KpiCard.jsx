import { motion } from "framer-motion"

/**
 * Gradient stat card used on Dashboard and Forecast pages.
 *
 * @param {string}    title    - Label shown above the value
 * @param {string}    value    - Primary display value
 * @param {ReactNode} icon     - Lucide icon element
 * @param {string}    gradient - Tailwind gradient classes e.g. "from-blue-500 to-cyan-500"
 * @param {number}    delay    - Stagger animation delay (seconds)
 */
export default function KpiCard({ title, value, icon, gradient, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.03 }}
      className={`glass-card overflow-hidden rounded-[28px] p-6 border border-white/10 shadow-2xl bg-gradient-to-br ${gradient}`}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-slate-200 opacity-85">{title}</p>
          <h2 className="text-3xl font-bold mt-3 tracking-tight">{value}</h2>
        </div>
        <div className="bg-white/10 p-4 rounded-3xl backdrop-blur-xl">{icon}</div>
      </div>
    </motion.div>
  )
}
