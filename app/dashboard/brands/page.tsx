import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

async function getBrands(userId: string) {
  return prisma.brand.findMany({
    where: { ownerId: userId },
    orderBy: { createdAt: "asc" },
  });
}

export default async function BrandsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/api/auth/signin");
  }
  const userId = (session.user as any).id as string;
  const brands = await getBrands(userId);
  const currentId = cookies().get("currentBrandId")?.value ?? brands[0]?.id ?? null;

  async function createBrand(formData: FormData) {
    "use server";
    const session = await getServerSession(authOptions);
    if (!session?.user) redirect("/api/auth/signin");
    const userId = (session.user as any).id as string;
    const name = (formData.get("name") as string | null)?.trim() || "New Brand";
    await prisma.brand.create({ data: { name, ownerId: userId } });
    revalidatePath("/dashboard/brands");
  }

  async function renameBrand(formData: FormData) {
    "use server";
    const session = await getServerSession(authOptions);
    if (!session?.user) redirect("/api/auth/signin");
    const id = (formData.get("id") as string) ?? "";
    const name = (formData.get("name") as string | null)?.trim();
    if (id && name) {
      await prisma.brand.update({ where: { id }, data: { name } });
    }
    revalidatePath("/dashboard/brands");
  }

  async function deleteBrand(formData: FormData) {
    "use server";
    const session = await getServerSession(authOptions);
    if (!session?.user) redirect("/api/auth/signin");
    const id = (formData.get("id") as string) ?? "";
    if (id) {
      await prisma.brand.delete({ where: { id } });
      const c = cookies();
      if (c.get("currentBrandId")?.value === id) {
        c.set("currentBrandId", "", { path: "/", maxAge: 0 });
      }
    }
    revalidatePath("/dashboard/brands");
  }

  async function selectBrand(formData: FormData) {
    "use server";
    const id = (formData.get("id") as string) ?? "";
    if (id) {
      cookies().set("currentBrandId", id, { path: "/", httpOnly: false, sameSite: "lax" });
    }
    revalidatePath("/dashboard/brands");
  }

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-semibold">Brands</h1>
      <p className="mt-2 text-ink-300">Create and manage brands (workspaces) for your business or clients.</p>

      <section className="mt-8 rounded-xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold">Create a new brand</h2>
        <form action={createBrand} className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            name="name"
            placeholder="e.g. Acme Co."
            className="w-full rounded-md border border-white/20 bg-transparent px-3 py-2 text-sm placeholder:text-ink-500 outline-none"
          />
          <button type="submit" className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium hover:bg-brand-500">
            Create
          </button>
        </form>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold">Your brands</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {brands.map((b) => (
            <div key={b.id} className="rounded-xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm text-ink-400">
                  ID: <span className="text-ink-300">{b.id.slice(0, 8)}…</span>
                </div>
                <form action={selectBrand}>
                  <input type="hidden" name="id" value={b.id} />
                  <button
                    type="submit"
                    className={`rounded-md px-3 py-1.5 text-xs ${
                      currentId === b.id ? "bg-brand-600" : "border border-white/20 hover:bg-white/10"
                    }`}
                  >
                    {currentId === b.id ? "Selected" : "Select"}
                  </button>
                </form>
              </div>

              <form action={renameBrand} className="mt-4 flex flex-col gap-3 sm:flex-row">
                <input type="hidden" name="id" value={b.id} />
                <input
                  type="text"
                  name="name"
                  defaultValue={b.name}
                  className="w-full rounded-md border border-white/20 bg-transparent px-3 py-2 text-sm placeholder:text-ink-500 outline-none"
                />
                <button type="submit" className="rounded-md border border-white/20 px-4 py-2 text-sm hover:bg-white/10">
                  Rename
                </button>
                <form action={deleteBrand}>
                  <input type="hidden" name="id" value={b.id} />
                  <button
                    type="submit"
                    className="rounded-md border border-red-500/40 px-4 py-2 text-sm text-red-300 hover:bg-red-500/10"
                  >
                    Delete
                  </button>
                </form>
              </form>
            </div>
          ))}
          {brands.length === 0 && (
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-sm text-ink-300">
              No brands yet. Create your first brand above.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}