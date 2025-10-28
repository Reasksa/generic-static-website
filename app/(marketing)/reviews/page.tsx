export default function ReviewsPage() {
  return (
    <div className="container py-16">
      <h1 className="text-3xl font-semibold">Reviews</h1>
      <p className="mt-2 max-w-2xl text-ink-300">What our users say about running social on autopilot.</p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {testimonials.map((t) => (
          <div key={t.name} className="rounded-xl border border-white/10 bg-white/5 p-6">
            <blockquote className="text-sm text-ink-200">&ldquo;{t.quote}&rdquo;</blockquote>
            <div className="mt-4 text-sm text-ink-400">— {t.name}, {t.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const testimonials = [
  { name: "Daniel V.", title: "Founder", quote: "Centralized posting is brilliant and automations save hours every week." },
  { name: "Sana T.", title: "Content Marketer", quote: "Bulk scheduling and collections made our monthly planning effortless." },
  { name: "Gloria O.", title: "Agency Owner", quote: "From import to scheduling to reporting—our workflow finally clicks." },
  { name: "Joel D.", title: "Marketing Manager", quote: "Multi-brand workspaces give us the granularity we need for clients." },
];