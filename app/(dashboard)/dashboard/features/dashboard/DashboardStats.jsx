const DashboardStats = ({ title, icon, value, colorIndex }) => {
  const COLORS = ['primary', 'primary']

  return (
    <div className="shadow stats">
      <div className="stat">
        <div className="stat-figure">{icon}</div>
        <div className="stat-title text-wrap">{title}</div>
        <div className="mt-2 stat-value">{value}</div>
      </div>
    </div>
  )
}

export default DashboardStats