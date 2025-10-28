export default function DashboardHome() {
  return (
    <div className="container py-10">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="mt-2 text-ink-300">This is your app shell. Next steps: auth, brands, channels, collections, calendar.</p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <Card title="Brands" desc="Create a workspace for each brand or client." />
        <Card title="Channels" desc="Connect Instagram, TikTok, LinkedIn, X, Pinterest and more." />
        <Card title="Collections" desc="Organize content by theme, with schedules and channels." />
        <Card title="Calendar" desc="Unified calendar view of your upcoming posts." />
        <Card title="Media Library" desc="Upload and manage images and videos." />
        <Card title="Insights" desc="Monitor performance and top posts." />
      </div>
    </div>
  );
}

function Card({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-ink-300">{desc}</p>
    </div>
  );
}