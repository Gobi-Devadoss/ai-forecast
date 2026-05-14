import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { TrendingUp, BrainCircuit, ShieldCheck } from "lucide-react"

import API from "../api/api"
import AuthLayout from "../components/AuthLayout"
import FormInput from "../components/FormInput"

const FEATURES = [
  { icon: <TrendingUp size={28} />, label: "Intelligent analytics platform" },
  { icon: <BrainCircuit size={28} />, label: "Machine learning forecasting" },
  { icon: <ShieldCheck size={28} />, label: "Secure and scalable architecture" },
]

export default function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ name: "", email: "", password: "" })
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")
    try {
      const { data } = await API.post("/auth/register", formData)
      setMessage(data.message)
      setTimeout(() => navigate("/"), 1500)
    } catch (err) {
      setMessage(err.response?.data?.detail || "Registration failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      gradient="from-purple-600 via-indigo-700 to-slate-900"
      tagline="Create your account and unlock powerful AI-driven business forecasting and analytics."
      features={FEATURES.map(({ icon, label }) => (
        <div key={label} className="flex items-center gap-4">
          {icon}
          <span className="text-lg">{label}</span>
        </div>
      ))}
    >
      <h2 className="text-4xl font-bold mb-3 page-heading">Create Account</h2>
      <p className="text-slate-300 mb-8">Start using AI forecasting today</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <FormInput label="Full Name" name="name" placeholder="Enter full name" onChange={handleChange} focusRing="purple" />
        <FormInput label="Email Address" type="email" name="email" placeholder="Enter email" onChange={handleChange} focusRing="purple" />
        <FormInput label="Password" type="password" name="password" placeholder="Enter password" onChange={handleChange} focusRing="purple" />

        {message && <p className="text-center text-sm text-slate-200">{message}</p>}

        <button
          type="submit"
          disabled={loading}
          className="glass-btn btn-primary w-full py-4 rounded-2xl font-semibold text-lg transition disabled:opacity-50"
        >
          {loading ? "Creating Account…" : "Register"}
        </button>
      </form>

      <p className="text-center mt-8 text-slate-400">
        Already have an account?{" "}
        <Link to="/" className="text-purple-400 font-semibold hover:underline">Login</Link>
      </p>
    </AuthLayout>
  )
}
