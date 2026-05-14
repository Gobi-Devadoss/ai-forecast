import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { TrendingUp, BrainCircuit, ShieldCheck } from "lucide-react"
import toast from "react-hot-toast"

import API from "../api/api"
import AuthLayout from "../components/AuthLayout"
import FormInput from "../components/FormInput"

const FEATURES = [
  { icon: <TrendingUp size={28} />, label: "Real-time analytics dashboard" },
  { icon: <BrainCircuit size={28} />, label: "AI-powered future predictions" },
  { icon: <ShieldCheck size={28} />, label: "Secure JWT authentication" },
]

export default function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/dashboard")
  }, [navigate])

  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const body = new URLSearchParams({ username: formData.email, password: formData.password })
      const { data } = await API.post("/auth/login", body, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      localStorage.setItem("token", data.access_token)
      toast.success("Login successful")
      navigate("/dashboard")
    } catch (err) {
      const msg = err.response?.data?.detail || "Login failed"
      setError(msg)
      toast.error("Invalid credentials")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      gradient="from-blue-600 via-indigo-700 to-slate-900"
      tagline="Intelligent demand forecasting and business analytics platform powered by machine learning."
      features={FEATURES.map(({ icon, label }) => (
        <div key={label} className="flex items-center gap-4">
          {icon}
          <span className="text-lg">{label}</span>
        </div>
      ))}
    >
      <h2 className="text-4xl font-bold mb-3 page-heading">Welcome Back</h2>
      <p className="text-slate-300 mb-8">Login to continue to your dashboard</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <FormInput label="Email Address" type="email" name="email" placeholder="Enter email" onChange={handleChange} />
        <FormInput label="Password" type="password" name="password" placeholder="Enter password" onChange={handleChange} />

        {error && <p className="text-rose-400 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="glass-btn btn-primary w-full py-4 rounded-2xl font-semibold text-lg transition disabled:opacity-50"
        >
          {loading ? "Logging in…" : "Login"}
        </button>
      </form>

      <p className="text-center mt-8 text-slate-400">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="text-blue-400 font-semibold hover:underline">Register</Link>
      </p>
    </AuthLayout>
  )
}
