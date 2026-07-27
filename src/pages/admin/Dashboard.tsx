import StatCard from "../../components/ui/StatCard";

export default function Dashboard() {
  return (
    <div className="page">

      <h1>Dashboard</h1>

      <p>Welcome to BlackFrame CMS.</p>

      <div className="stats-grid">

        <StatCard
          title="Pages"
          value={0}
        />

        <StatCard
          title="Media"
          value={0}
        />

        <StatCard
          title="Visitors"
          value={0}
        />

        <StatCard
          title="Forms"
          value={0}
        />

      </div>

    </div>
  );
}