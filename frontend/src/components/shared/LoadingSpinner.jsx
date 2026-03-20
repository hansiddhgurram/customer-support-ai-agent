export default function LoadingSpinner({ size = 16 }) {
  return (
    <div style={{
      width: size, height: size,
      border: "2px solid rgba(34,211,238,0.2)",
      borderTop: "2px solid #22d3ee",
      borderRadius: "50%",
      animation: "spin 0.7s linear infinite"
    }} />
  )
}