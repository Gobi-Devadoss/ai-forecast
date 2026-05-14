/**
 * Frosted-glass card wrapper for Recharts charts.
 */
export default function ChartCard({ title, children }) {
  return (
    <div className="glass-card rounded-[28px] p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold section-title">{title}</h2>
      </div>
      {children}
    </div>
  )
}
