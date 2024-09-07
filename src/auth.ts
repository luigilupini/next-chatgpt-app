import NextAuth from "next-auth";
import { NextAuthConfig } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const authOptions: NextAuthConfig = {
  callbacks: {
    async signIn({ profile }) {
      console.log(profile);
      // Change this to your username
      return profile?.login === "luigilupini";
      return true; // Anyone can sign in to this app by default
    },
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  basePath: "/api/auth",
  secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
