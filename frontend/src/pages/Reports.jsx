import { motion } from "framer-motion"
import { FileSpreadsheet, FileText, Download } from "lucide-react"
import { useDownloadReport } from "../hooks/useDownloadReport"

const REPORTS = [
  {
    key: "pdf",
    title: "PDF Report",
    description: "Download forecasting analytics and business insights in PDF format.",
    endpoint: "/reports/export-pdf",
    filename: "forecast_report.pdf",
    icon: <FileText size={40} className="text-rose-400" />,
    iconBg: "bg-rose-500/15",
    btnClass: "btn-primary",
    loadingLabel: "Generating PDF…",
    label: "Download PDF Report",
  },
  {
    key: "excel",
    title: "Excel Report",
    description: "Export monthly sales analytics and forecast data to Excel.",
    endpoint: "/reports/export-excel",
    filename: "forecast_report.xlsx",
    icon: <FileSpreadsheet size={40} className="text-emerald-400" />,
    iconBg: "bg-emerald-500/15",
    btnClass: "btn-primary",
    loadingLabel: "Generating Excel…",
    label: "Download Excel Report",
  },
]

export default function Reports() {
  const { downloading, download } = useDownloadReport()

  return (
    <div className="min-h-screen text-white space-y-10">
      <section className="max-w-4xl">
        <p className="text-cyan-300 uppercase tracking-[0.35em] text-xs mb-3">Report Center</p>
        <h1 className="text-5xl font-bold page-heading">AI Reports Center</h1>
        <p className="text-slate-400 mt-4 text-lg">Generate and download business forecasting reports with one click.</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {REPORTS.map((report) => (
          <motion.div
            key={report.key}
            whileHover={{ scale: 1.02 }}
            className="glass-card rounded-[30px] p-8 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <div className={`${report.iconBg} p-4 rounded-3xl`}>{report.icon}</div>
              <Download className="text-slate-400" />
            </div>
            <h2 className="text-3xl font-bold mb-3 section-title">{report.title}</h2>
            <p className="text-slate-400 mb-8 leading-relaxed">{report.description}</p>
            <button
              onClick={() => download(report.endpoint, report.filename)}
              disabled={downloading}
              className={`${report.btnClass} glass-btn w-full py-4 rounded-2xl text-lg font-semibold disabled:opacity-50`}
            >
              {downloading ? report.loadingLabel : report.label}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
