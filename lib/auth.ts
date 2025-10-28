import NextAuth, { type NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "database" },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Ensure a default Brand exists for first-time users
      const count = await prisma.brand.count({ where: { ownerId: user.id } });
      if (count === 0) {
        const name = user.name ? `${user.name}'s Brand` : "My Brand";
        await prisma.brand.create({
          data: { name, ownerId: user.id },
        });
      }
      return true;
    },
    async session({ session, user }) {
      if (session.user) {
        (session.user as any).id = user.id;
        (session.user as any).onboarded = (user as any).onboarded ?? false;
      }
      return session;
    },
  },
  pages: {
    signIn: "/api/auth/signin",
  },
};

export default NextAuth(authOptions);