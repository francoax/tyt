import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/",
    signOut: "/",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnHome = nextUrl.pathname.startsWith("/home");

      if (isOnHome) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/home", nextUrl));
      }
      return true;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 1,
  },
  providers: [],
} satisfies NextAuthConfig;
