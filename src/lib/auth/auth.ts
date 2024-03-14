import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { getUser } from "../data/users";
import { comparePasswords } from "../utils";

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials, request) {
        const { username, password } = credentials;
        const userToAuthorize = await getUser(username as string, false);

        if (!userToAuthorize) return null;

        const samePassword = await comparePasswords(
          password as string,
          userToAuthorize.password,
        );

        if (!samePassword) return null;

        return {
          id: userToAuthorize.id.toString(),
          username: userToAuthorize.username,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60,
  },
});
