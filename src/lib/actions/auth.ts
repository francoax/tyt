"use server";

import { AuthError } from "next-auth";
import { signIn, signOut } from "../auth/auth";
import { ERROR_STATUS, SUCCESS_STATUS } from "../constants";
import { Auth, ServerActionResponse } from "../definitions";
import { SignInSchema } from "../validations";

export async function signOutAction() {
  await signOut({
    redirect: true,
    redirectTo: "/",
  });
}

export async function signInAction(
  prevState: ServerActionResponse,
  data: FormData,
): Promise<ServerActionResponse> {
  const credentialsValidated = SignInSchema.safeParse(
    Object.fromEntries(data.entries()),
  );

  if (!credentialsValidated.success) {
    return {
      message: "Por favor, revise los campos",
      status: ERROR_STATUS,
      errors: credentialsValidated.error.flatten().fieldErrors,
    };
  }

  const credentials: Auth = credentialsValidated.data;

  try {
    await signIn("credentials", credentials);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "Credenciales incorrectas.",
            status: ERROR_STATUS,
            errors: { username: [], password: [] },
          };
        default:
          return {
            message: "Ups.. algo salio mal.",
            status: ERROR_STATUS,
            errors: {},
          };
      }
    }
    throw error;
  }

  return {
    message: "Ingreso exitoso.",
    status: SUCCESS_STATUS,
  };
}
