import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }

  const userId = (session.user as any).id as string;
  const form = await req.formData();
  const brandName = (form.get("brandName") as string | null)?.trim();

  // Update first brand name if provided
  if (brandName) {
    const brand = await prisma.brand.findFirst({ where: { ownerId: userId }, orderBy: { createdAt: "asc" } });
    if (brand) {
      await prisma.brand.update({ where: { id: brand.id }, data: { name: brandName } });
    }
  }

  // Mark user onboarded
  await prisma.user.update({
    where: { id: userId },
    data: { onboarded: true },
  });

  return NextResponse.redirect(new URL("/dashboard", req.url));
}