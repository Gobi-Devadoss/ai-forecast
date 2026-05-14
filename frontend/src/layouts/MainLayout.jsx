import {
  LayoutDashboard, Upload, BrainCircuit,
  FileText, LogOut, Zap
} from "lucide-react"
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import toast from "react-hot-toast"

function MainLayout() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    localStorage.removeItem("token")
    toast.success("Logged out successfully")
    navigate("/")
  }

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Upload Dataset", path: "/upload", icon: <Upload size={18} /> },
    { name: "Forecast", path: "/forecast", icon: <BrainCircuit size={18} /> },
    { name: "Reports", path: "/reports", icon: <FileText size={18} /> }
  ]

  return (
    <div className="flex min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.14),transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.12),transparent_20%),linear-gradient(180deg,#020617,#06101c)] text-white">
      <motion.aside
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="w-72 min-w-[280px] shrink-0 bg-glass border-r border-white/10 p-8 flex flex-col justify-between"
      >
        <div>
          <div className="mb-10 px-2">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <Zap size={20} className="text-slate-950" strokeWidth={2.2} />
              </div>
              <div>
                <h1 className="text-xl font-semibold tracking-tight">AI Forecast</h1>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Demand Intelligence</p>
              </div>
            </div>
          </div>

          <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500 px-2 mb-3">Navigation</p>

          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const active = location.pathname === item.path
              return (
                <Link key={item.name} to={item.path} className="no-underline">
                  <motion.div
                    whileHover={{ x: 4 }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 ${active ? "bg-white/10 border border-cyan-400/20 text-cyan-300 shadow-lg shadow-cyan-500/10" : "text-slate-300 hover:bg-white/5 hover:text-white"}`}
                  >
                    {item.icon}
                    <span className="text-sm font-medium">{item.name}</span>
                    {active && <span className="ml-auto h-2 w-2 rounded-full bg-cyan-300" />}
                  </motion.div>
                </Link>
              )
            })}
          </nav>
        </div>

        <motion.button
          whileHover={{ x: 3 }}
          onClick={handleLogout}
          className="glass-btn btn-secondary w-full flex items-center gap-3 justify-center py-3 rounded-2xl text-sm font-semibold"
        >
          <LogOut size={18} />
          Logout
        </motion.button>
      </motion.aside>

      <main className="flex-1 overflow-auto p-10 xl:p-12">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout