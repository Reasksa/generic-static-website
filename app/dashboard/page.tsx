import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardHome() {
  const session = await getServerSession(authOptions);
  const authed = Boolean(session?.user);

  if (!authed) {
    return (
      <div className="container py-16">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="mt-2 text-ink-300">Please sign in to access your dashboard.</p>
        <Link href="/api/auth/signin" className="mt-6 inline-block rounded-md bg-brand-600 px-4 py-2 text-sm hover:bg-brand-500">
          Sign in
        </Link>
      </div>
    );
  }

  const onboarded = Boolean((session!.user as any).onboarded);
  if (!onboarded) {
    redirect("/onboarding");
  }

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="mt-2 text-ink-300">This is your app shell. Next steps: auth, brands, channels, collections, calendar.</p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <Link href="/dashboard/brands" className="block rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10">
          <h3 className="text-lg font-semibold">Brands</h3>
          <p className="mt-2 text-sm text-ink-300">Create a workspace for each brand or client.</p>
        </Link>
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