import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUser } from "../data/users";
import { comparePasswords } from "../utils";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/",
    signOut: "/",
  },
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {}
      },
      authorize: async (credentials) => {
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
          name: userToAuthorize.username,
        };
      },
    })
  ],
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
  }
});


// import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import { authConfig } from "./auth.config";
// import { getUser } from "../data/users";
// import { comparePasswords } from "../utils";

// export const {
//   auth,
//   handlers: { GET, POST },
//   signIn,
//   signOut,
// } = NextAuth({
//   ...authConfig,
//   providers: [
//     Credentials({
//       async authorize(credentials, request) {
//         const { username, password } = credentials;
//         const userToAuthorize = await getUser(username as string, false);

//         if (!userToAuthorize) return null;

//         const samePassword = await comparePasswords(
//           password as string,
//           userToAuthorize.password,
//         );

//         if (!samePassword) return null;

//         return {
//           id: userToAuthorize.id.toString(),
//           username: userToAuthorize.username,
//         };
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//     maxAge: 1 * 24 * 60 * 60,
//   },
// });
