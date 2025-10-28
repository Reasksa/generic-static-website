import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function CollectionsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/api/auth/signin");

  const userId = (session.user as any).id as string;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { onboarded: true },
  });
  if (!user?.onboarded) redirect("/onboarding");

  const brands = await prisma.brand.findMany({
    where: { ownerId: userId },
    orderBy: { createdAt: "asc" },
  });
  if (brands.length === 0) redirect("/onboarding");

  const currentId = cookies().get("currentBrandId")?.value ?? brands[0].id;
  const current = brands.find((b) => b.id === currentId) ?? brands[0];

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Collections</h1>
          <p className="mt-2 text-ink-300">Organize posting schedules and channels for <span className="font-medium text-white">{current.name}</span>.</p>
        </div>
        <Link href="/dashboard/brands" className="rounded-md border border-white/20 px-3 py-1.5 text-sm hover:bg-white/10">
          Switch brand
        </Link>
      </div>

      <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-6 text-sm text-ink-300">
        <p>Collections are not implemented yet. Next steps:</p>
        <ul className="mt-3 list-disc pl-5">
          <li>Define Collection model (name, brandId, posting rules).</li>
          <li>Create CRUD for collections and assign target channels.</li>
          <li>Implement queueing engine to auto-schedule posts based on collection slots.</li>
        </ul>
      </div>
    </div>
  );
}