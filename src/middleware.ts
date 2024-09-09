export { auth as middleware } from "./lib/auth/auth";

// import NextAuth from "next-auth";
// import { authConfig } from "./lib/auth/auth.config";

// export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
