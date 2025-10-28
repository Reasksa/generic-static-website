import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="container py-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-ink-300">
            Social media scheduling with automation and AI
          </div>
          <h1 className="mt-6 text-4xl font-semibold leading-tight md:text-6xl">
            Run your social media on autopilot
          </h1>
          <p className="mt-4 text-lg text-ink-300 md:text-xl">
            Organize, automate, analyze and manage your social media from one dashboard.
            Save hours every week while staying consistent.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link
              href="/dashboard"
              className="rounded-md bg-brand-600 px-5 py-3 text-sm font-medium text-white hover:bg-brand-500"
            >
              Start 14-day free trial
            </Link>
            <Link
              href="/features"
              className="rounded-md border border-white/20 px-5 py-3 text-sm font-medium text-white/80 hover:bg-white/10"
            >
              Watch demo
            </Link>
          </div>
          <p className="mt-3 text-xs text-ink-400">
            Cancel anytime. No questions asked.
          </p>
        </div>
        <div className="mt-14 rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="aspect-[16/9] w-full rounded-lg bg-gradient-to-br from-brand-600/20 to-white/5"></div>
        </div>
      </section>

      <section className="container py-16">
        <h2 className="text-center text-2xl font-semibold md:text-3xl">
          Trusted by creators, entrepreneurs and agencies
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="rounded-lg border border-white/10 bg-white/5 py-6 text-center text-ink-400">
              Badge {i + 1}
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-ink-400">
          4.9/5 from 500+ reviews
        </p>
      </section>

      <section className="container grid gap-8 py-16 md:grid-cols-2">
        <FeatureCard
          title="Manage all your accounts from one place"
          desc="Connect Instagram, TikTok, LinkedIn, X, Pinterest, YouTube, Google Business Profile, and more."
        />
        <FeatureCard
          title="Organize content with Collections"
          desc="Create themed collections with their own channels and time slots. Add posts and we auto-queue them."
        />
        <FeatureCard
          title="Bulk schedule from a spreadsheet"
          desc="Import 100s of posts from Google Sheets or CSV. Captions, links, images, videos—ready to queue."
        />
        <FeatureCard
          title="AI assistant for content"
          desc="Brainstorm ideas, rewrite and refine captions, generate hashtags and threads."
        />
      </section>

      <section className="container py-16">
        <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center">
          <h3 className="text-2xl font-semibold">Get started in 60 seconds</h3>
          <p className="mt-2 text-ink-300">
            Unified calendar, AI caption writer, Unified inbox, Bulk scheduler, Link in bio, Media library, Evergreen recycling and more.
          </p>
          <Link
            href="/dashboard"
            className="mt-6 inline-block rounded-md bg-brand-600 px-5 py-3 text-sm font-medium text-white hover:bg-brand-500"
          >
            Try it free →
          </Link>
        </div>
      </section>
    </>
  );
}

function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-ink-300">{desc}</p>
      <div className="mt-4 h-36 rounded-lg bg-gradient-to-tr from-white/5 to-brand-600/20" />
    </div>
  );
}