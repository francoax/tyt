"use server";

import { ServerActionResponse } from "../definitions";

export async function signInAction(
  prevState: ServerActionResponse,
  data: FormData,
): Promise<ServerActionResponse> {
  console.log(data);
  await new Promise((resolve) => setTimeout(() => resolve(""), 3000));
  return {};
}
