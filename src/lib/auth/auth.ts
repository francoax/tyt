import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      authorize(credentials, request) {
        console.log("credentials -> ", credentials);
        console.log("request ->", request);
        return null;
      },
    }),
  ],
});
