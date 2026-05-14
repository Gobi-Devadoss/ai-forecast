import { useEffect, useState } from "react"
import { TrendingUp, IndianRupee, Database, BrainCircuit } from "lucide-react"
import { motion } from "framer-motion"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

import API from "../api/api"
import KpiCard from "../components/KpiCard"
import ChartCard from "../components/ChartCard"
import SalesLineChart from "../components/SalesLineChart"

const SKELETON_PROPS = { baseColor: "#0f172a", highlightColor: "#334155" }

export default function Dashboard() {
  const [summary, setSummary] = useState(null)
  const [monthlySales, setMonthlySales] = useState([])
  const [forecast, setForecast] = useState([])
  const [loading, setLoading] = useState(true)

  async function fetchDashboardData() {
    try {
      setLoading(true)
      const [summaryRes, salesRes, forecastRes] = await Promise.all([
        API.get("/analytics/summary"),
        API.get("/analytics/monthly-sales"),
        API.get("/forecast/predict?future_months=6"),
      ])
      setSummary(summaryRes.data)
      setMonthlySales(salesRes.data)
      setForecast(forecastRes.data.forecast)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    async function load() {
      await fetchDashboardData()
    }
    load()
  }, [])

  const cards = [
    { title: "Total Revenue", value: `₹ ${summary?.total_sales ?? 0}`, icon: <IndianRupee size={24} />, gradient: "from-cyan-500 via-blue-500 to-violet-500" },
    { title: "Dataset Rows", value: summary?.total_rows ?? 0, icon: <Database size={24} />, gradient: "from-fuchsia-500 via-purple-500 to-indigo-500" },
    { title: "Top Product", value: summary?.top_products ? Object.keys(summary.top_products)[0] : "N/A", icon: <TrendingUp size={24} />, gradient: "from-emerald-500 via-teal-500 to-cyan-500" },
    { title: "AI Forecast", value: "Active", icon: <BrainCircuit size={24} />, gradient: "from-orange-500 via-amber-500 to-yellow-400" },
  ]

  return (
    <div className="min-h-screen text-white space-y-10">
      <section className="max-w-4xl">
        <p className="text-cyan-300 uppercase tracking-[0.35em] text-xs mb-3">Analytics Overview</p>
        <h1 className="text-5xl font-bold page-heading">AI Analytics Dashboard</h1>
        <p className="text-slate-400 mt-4 text-lg max-w-2xl">Real-time sales analytics, forecasting intelligence, and performance insights for smarter operations.</p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {loading
          ? Array(4).fill(0).map((_, i) => (
              <div key={i} className="glass-card rounded-[28px] p-6">
                <Skeleton height={120} borderRadius={24} {...SKELETON_PROPS} />
              </div>
            ))
          : cards.map((card, i) => <KpiCard key={card.title} {...card} delay={i * 0.1} />)
        }
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <ChartCard title="Monthly Revenue Trend">
          {loading
            ? <Skeleton height={350} borderRadius={20} {...SKELETON_PROPS} />
            : <SalesLineChart data={monthlySales} dataKey="revenue" color="#22d3ee" />
          }
        </ChartCard>
        <ChartCard title="AI Forecast Prediction">
          {loading
            ? <Skeleton height={350} borderRadius={20} {...SKELETON_PROPS} />
            : <SalesLineChart data={forecast} dataKey="predicted_revenue" color="#34d399" />
          }
        </ChartCard>
      </section>

      <section className="glass-card rounded-[28px] p-8">
        <div className="mb-8">
          <p className="text-cyan-300 uppercase tracking-[0.3em] text-xs mb-3">Market Highlights</p>
          <h2 className="text-3xl font-bold section-title">Top Performing Products</h2>
          <p className="text-slate-400 mt-2">Highest revenue-generating products across active datasets.</p>
        </div>
        <div className="grid gap-4">
          {loading
            ? Array(5).fill(0).map((_, i) => (
                <Skeleton key={i} height={88} borderRadius={24} {...SKELETON_PROPS} />
              ))
            : summary?.top_products && Object.entries(summary.top_products).map(([product, revenue]) => (
                <motion.div
                  key={product}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between gap-4 bg-white/5 border border-white/10 rounded-3xl px-6 py-5"
                >
                  <div>
                    <h3 className="text-xl font-semibold">{product}</h3>
                    <p className="text-slate-400 text-sm mt-1">Revenue generated</p>
                  </div>
                  <div className="text-2xl font-bold text-emerald-400">₹ {revenue}</div>
                </motion.div>
              ))
          }
        </div>
      </section>
    </div>
  )
}
