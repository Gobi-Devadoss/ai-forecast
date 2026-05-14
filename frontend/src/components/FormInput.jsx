/**
 * Labelled text/email/password input used in Login and Register forms.
 */
const FOCUS_COLORS = {
  blue: "rgba(56, 189, 248, 0.18)",
  purple: "rgba(168, 85, 247, 0.18)",
}

export default function FormInput({ label, type = "text", name, placeholder, onChange, focusRing = "blue" }) {
  const focusColor = FOCUS_COLORS[focusRing] || FOCUS_COLORS.blue

  return (
    <div>
      <label className="block mb-2 text-sm text-slate-300">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        required
        className="w-full input-glass rounded-2xl px-5 py-4 outline-none transition shadow-inner"
        style={{ boxShadow: `0 0 0 3px ${focusColor}` }}
      />
    </div>
  )
}
