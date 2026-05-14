import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from "recharts"

const GRID_STROKE = "#334155"
const AXIS_STROKE = "#94a3b8"

/**
 * Reusable line chart for sales / forecast data.
 *
 * @param {Array}  data      - Array of records
 * @param {string} dataKey   - Key for the Y-axis values
 * @param {string} color     - Stroke colour (hex or Tailwind)
 * @param {number} height    - Chart height in px (default 350)
 */
export default function SalesLineChart({ data, dataKey, color = "#3b82f6", height = 350 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} />
        <XAxis dataKey="month" stroke={AXIS_STROKE} />
        <YAxis stroke={AXIS_STROKE} />
        <Tooltip />
        <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={4} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}
