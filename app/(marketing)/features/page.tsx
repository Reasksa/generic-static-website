export default function FeaturesPage() {
  return (
    <div className="container py-16">
      <h1 className="text-3xl font-semibold">Features</h1>
      <p className="mt-2 max-w-2xl text-ink-300">
        Automations, collections, bulk scheduling, AI assistant, analytics, media library and more.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {features.map((f) => (
          <div key={f.title} className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold">{f.title}</h3>
            <p className="mt-2 text-sm text-ink-300">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const features = [
  { title: "Connect Channels", desc: "Manage Instagram, TikTok, LinkedIn, X, Pinterest, YouTube, GBP and more." },
  { title: "Collections", desc: "Group content into collections with their own schedules and channels." },
  { title: "AI Assistant", desc: "Generate ideas, rewrite captions, produce hashtags and threads." },
  { title: "Bulk Import", desc: "Import posts from CSV/Sheets with images and videos at scale." },
  { title: "Cross‑posting", desc: "Automatically cross‑post Reels to TikTok, Shorts, Pinterest and more." },
  { title: "Insights", desc: "Track performance, top posts, click analytics and growth trends." },
];