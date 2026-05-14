import { useState } from "react"
import { motion } from "framer-motion"
import { UploadCloud, FileSpreadsheet, CheckCircle2 } from "lucide-react"
import API from "../api/api"

export default function UploadDataset() {
  const [file, setFile] = useState(null)
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
    setSuccess(false)
    setMessage("")
  }

  const handleUpload = async () => {
    if (!file) return setMessage("Please select a file")

    try {
      setLoading(true)
      setMessage("")
      const formData = new FormData()
      formData.append("file", file)
      const { data } = await API.post("/dataset/upload", formData)
      setMessage(data.message)
      setSuccess(true)
    } catch (err) {
      setSuccess(false)
      setMessage(err.response?.data?.detail || "Upload failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen text-white space-y-10">
      <section className="max-w-3xl">
        <p className="text-cyan-300 uppercase tracking-[0.35em] text-xs mb-3">Data Intake</p>
        <h1 className="text-5xl font-bold page-heading">Upload Dataset</h1>
        <p className="text-slate-400 mt-4 text-lg">Upload CSV or Excel files for AI-powered demand forecasting and analytics.</p>
      </section>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card rounded-[30px] p-10 max-w-3xl"
      >
        <motion.label
          whileHover={{ scale: 1.01 }}
          className="border-2 border-dashed border-white/10 hover:border-cyan-400 transition rounded-[30px] p-14 flex flex-col items-center justify-center text-center cursor-pointer bg-white/5"
        >
          <input type="file" accept=".csv,.xlsx" onChange={handleFileChange} className="hidden" />
          <UploadCloud size={70} className="text-cyan-300 mb-6" />
          <h2 className="text-2xl font-bold mb-3">Drag & Drop or Select File</h2>
          <p className="text-slate-400">Upload CSV or Excel datasets for deeper forecasting intelligence.</p>
        </motion.label>

        {file && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 glass-card rounded-3xl p-5 flex items-center gap-4"
          >
            <FileSpreadsheet size={40} className="text-emerald-400" />
            <div>
              <h3 className="font-semibold text-lg">{file.name}</h3>
              <p className="text-slate-400 text-sm">Dataset ready for upload</p>
            </div>
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleUpload}
          disabled={loading}
          className="glass-btn btn-primary w-full mt-8 py-4 rounded-2xl text-lg font-semibold disabled:opacity-50"
        >
          {loading ? "Uploading Dataset…" : "Upload Dataset"}
        </motion.button>

        {message && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`mt-6 rounded-2xl p-5 flex items-center gap-4 ${
              success
                ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300"
                : "bg-rose-500/10 border border-rose-500/30 text-rose-300"
            }`}
          >
            {success && <CheckCircle2 size={28} />}
            <p className="font-medium">{message}</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
