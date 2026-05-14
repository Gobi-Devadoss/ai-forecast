import { useCallback, useEffect, useState } from "react"
import { BrainCircuit, TrendingUp, Activity, BarChart3, Filter } from "lucide-react"
import { motion } from "framer-motion"

import API from "../api/api"
import KpiCard from "../components/KpiCard"
import ChartCard from "../components/ChartCard"
import SalesLineChart from "../components/SalesLineChart"

export default function Forecast() {
  const [forecastData, setForecastData] = useState([])
  const [forecastError, setForecastError] = useState(0)
  const [model, setModel] = useState("")
  const [category, setCategory] = useState("")
  const [product, setProduct] = useState("")
  const [months, setMonths] = useState(6)
  const [loading, setLoading] = useState(false)

  const fetchForecast = useCallback(async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({ future_months: months })
      if (category) params.append("category", category)
      if (product) params.append("product", product)

      const { data } = await API.get(`/forecast/predict?${params}`)
      setForecastData(data.forecast)
      setForecastError(data.forecast_error_mape)
      setModel(data.model)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [category, product, months])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchForecast()
  }, [fetchForecast])

  const cards = [
    { title: "AI Model", value: model || "Prophet", icon: <BrainCircuit size={24} />, gradient: "from-cyan-500 via-blue-500 to-indigo-500" },
    { title: "Forecast Error", value: `${forecastError}%`, icon: <Activity size={24} />, gradient: "from-rose-500 via-orange-500 to-amber-400" },
    { title: "Forecast Months", value: forecastData.length, icon: <TrendingUp size={24} />, gradient: "from-violet-500 via-fuchsia-500 to-pink-500" },
    { title: "Prediction Status", value: "Active", icon: <BarChart3 size={24} />, gradient: "from-emerald-500 via-teal-500 to-cyan-500" },
  ]

  return (
    <div className="min-h-screen text-white space-y-10">
      <section className="max-w-4xl">
        <p className="text-cyan-300 uppercase tracking-[0.35em] text-xs mb-3">Forecast Intelligence</p>
        <h1 className="text-5xl font-bold page-heading">AI Forecast Intelligence</h1>
        <p className="text-slate-400 mt-4 text-lg max-w-2xl">Advanced demand forecasting with dynamic filtering and predictive insights.</p>
      </section>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-[30px] p-6 shadow-2xl"
      >
        <div className="flex items-center gap-3 mb-6">
          <Filter size={24} className="text-cyan-300" />
          <h2 className="text-2xl font-bold section-title">Forecast Filters</h2>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-[1.5fr_1.5fr_1fr_0.9fr] gap-5">
          {[
            { placeholder: "Category (Technology)", value: category, onChange: (e) => setCategory(e.target.value) },
            { placeholder: "Product (Chair)", value: product, onChange: (e) => setProduct(e.target.value) },
          ].map(({ placeholder, value, onChange }) => (
            <input
              key={placeholder}
              type="text"
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              className="input-glass rounded-2xl px-4 py-3 outline-none"
            />
          ))}
          <select
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="input-glass rounded-2xl px-4 py-3 outline-none"
          >
            {[3, 6, 12].map((m) => <option key={m} value={m}>{m} Months</option>)}
          </select>
          <button
            onClick={fetchForecast}
            disabled={loading}
            className="glass-btn btn-primary rounded-2xl font-semibold transition disabled:opacity-50"
          >
            {loading ? "Loading…" : "Generate Forecast"}
          </button>
        </div>
      </motion.div>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((card, i) => <KpiCard key={card.title} {...card} delay={i * 0.1} />)}
      </section>

      <section>
        <ChartCard title="Future Revenue Prediction">
          <p className="text-slate-400 -mt-4 mb-6">AI-generated forecast using Prophet.</p>
          <SalesLineChart data={forecastData} dataKey="predicted_revenue" color="#34d399" height={400} />
        </ChartCard>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card rounded-[30px] p-8 shadow-2xl"
      >
        <h2 className="text-3xl font-bold section-title mb-8">AI Forecast Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Trend Analysis", body: "Prophet detects long-term growth and seasonal demand behavior." },
            { title: "Forecast Quality", body: `Current forecast error is ${forecastError}% MAPE based on unseen validation data.` },
            { title: "Business Recommendation", body: "Use these insights to optimize inventory and future planning." },
          ].map(({ title, body }) => (
            <div key={title} className="glass-card rounded-3xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold mb-3">{title}</h3>
              <p className="text-slate-400 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="glass-card rounded-[30px] p-8 shadow-2xl"
      >
        <h2 className="text-3xl font-bold section-title mb-8">Future Predictions</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10">
                {['Forecast Month', 'Predicted Revenue', 'Status'].map((h) => (
                  <th key={h} className="py-5 text-slate-300">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {forecastData.map((item) => (
                <tr key={item.month} className="border-b border-white/10">
                  <td className="py-5 font-medium">{item.month}</td>
                  <td className="py-5 text-emerald-300 font-semibold">₹ {item.predicted_revenue}</td>
                  <td className="py-5">
                    <span className="inline-flex rounded-full bg-emerald-500/15 px-4 py-2 text-sm text-emerald-300">Predicted</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>
    </div>
  )
}
