import "./globals.css";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { AuthButton } from "@/components/auth-button";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const metadata = {
  title: "Nueclone — Social media scheduling with automation and AI",
  description: "Organize, automate, analyze and manage your social media from one place. Marketing site + dashboard shell.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  const authed = Boolean(session?.user);

  let brands: { id: string; name: string }[] = [];
  let currentBrandId: string | null = null;

  if (authed) {
    const userId = (session!.user as any).id as string;
    brands = await prisma.brand.findMany({
      where: { ownerId: userId },
      select: { id: true, name: true },
      orderBy: { createdAt: "asc" },
    });
    const cookie = cookies().get("currentBrandId")?.value ?? null;
    currentBrandId = cookie ?? brands[0]?.id ?? null;
  }

  async function selectBrand(formData: FormData) {
    "use server";
    const id = (formData.get("id") as string) ?? "";
    if (id) {
      cookies().set("currentBrandId", id, { path: "/", httpOnly: false, sameSite: "lax" });
      revalidatePath("/", "layout");
      revalidatePath("/dashboard");
    }
  }

  return (
    <html lang="en">
      <body>
        <header className="border-b border-white/10">
          <nav className="container flex h-16 items-center justify-between">
            <Link href="/" className="font-semibold">
              <span className="rounded bg-brand-600/20 px-2 py-1 text-brand-400">Nue</span>clone
            </Link>
            <div className="hidden items-center gap-6 md:flex text-sm text-ink-300">
              <Link href="/features">Features</Link>
              <Link href="/pricing">Pricing</Link>
              <Link href="/reviews">Reviews</Link>
              <Link href="/dashboard" className="rounded-md bg-white/10 px-3 py-1.5 hover:bg-white/20">Dashboard</Link>
              <Link href="/api/health" className="text-ink-400">API</Link>
              {authed && brands.length > 0 && (
                <form action={selectBrand} className="flex items-center gap-2">
                  <label className="text-xs text-ink-500">Brand</label>
                  <select
                    name="id"
                    defaultValue={currentBrandId ?? undefined}
                    className="rounded-md border border-white/20 bg-transparent px-2 py-1 text-xs outline-none"
                    onChange={(e) => e.currentTarget.form?.requestSubmit()}
                  >
                    {brands.map((b) => (
                      <option key={b.id} value={b.id} className="bg-[var(--card)] text-white">
                        {b.name}
                      </option>
                    ))}
                  </select>
                  <Link href="/dashboard/brands" className="rounded-md border border-white/20 px-2 py-1 text-xs hover:bg-white/10">
                    Manage
                  </Link>
                </form>
              )}
              <AuthButton authed={authed} />
            </div>
            <div className="md:hidden">
              <button className="rounded-md border border-white/20 px-3 py-1.5 text-sm">Menu</button>
            </div>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="mt-20 border-t border-white/10">
          <div className="container flex h-20 items-center justify-between text-sm text-ink-400">
            <p>© {new Date().getFullYear()} Nueclone</p>
            <div className="flex gap-4">
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}