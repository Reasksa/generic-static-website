import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function OnboardingPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return (
      <div className="container py-16">
        <h1 className="text-2xl font-semibold">Onboarding</h1>
        <p className="mt-2 text-ink-300">Please sign in to continue.</p>
      </div>
    );
  }

  const userId = (session.user as any).id as string;
  const brand = await prisma.brand.findFirst({ where: { ownerId: userId }, orderBy: { createdAt: "asc" } });

  return (
    <div className="container py-16">
      <h1 className="text-3xl font-semibold">Welcome to Nueclone</h1>
      <p className="mt-2 max-w-2xl text-ink-300">
        We created a default Brand for you. You can rename it now. You can always add more brands later.
      </p>

      <form
        className="mt-8 max-w-md space-y-4"
        action="/api/onboarding/complete"
        method="post"
      >
        <label className="block text-sm text-ink-300">
          Brand name
          <input
            type="text"
            name="brandName"
            defaultValue={brand?.name ?? "My Brand"}
            className="mt-2 w-full rounded-md border border-white/20 bg-transparent px-3 py-2 outline-none placeholder:text-ink-500"
            placeholder="My Brand"
          />
        </label>
        <button
          type="submit"
          className="rounded-md bg-brand-600 px-5 py-2 text-sm font-medium hover:bg-brand-500"
        >
          Continue to Dashboard
        </button>
      </form>
    </div>
  );
}