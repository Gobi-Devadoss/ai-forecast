import { motion } from "framer-motion"
import { BrainCircuit } from "lucide-react"

/**
 * Shared two-column layout for Login and Register pages.
 *
 * @param {string}    gradient - Tailwind gradient for the left panel
 * @param {string}    tagline  - Subtitle shown under the logo
 * @param {ReactNode} features - List items for the left panel
 * @param {ReactNode} children - Form content rendered in the right panel
 */
export default function AuthLayout({ gradient, tagline, features, children }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.16),transparent_20%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.14),transparent_18%),#020617] text-white flex">
      <div className={`hidden xl:flex w-1/2 flex-col justify-center px-20 py-16 bg-gradient-to-br ${gradient}`}>
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center gap-4 mb-8">
            <div className="feature-icon">
              <BrainCircuit size={28} className="text-cyan-300" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-slate-200/80">AI Forecast</p>
              <h1 className="text-5xl font-bold leading-tight">Demand Forecasting Studio</h1>
            </div>
          </div>
          <p className="text-lg text-slate-100 leading-relaxed mb-12">{tagline}</p>
          <div className="space-y-5">{features}</div>
        </motion.div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card w-full max-w-md rounded-[30px] p-10"
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}
