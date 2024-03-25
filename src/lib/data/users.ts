"use server";

import prisma from "../prisma";

export async function getUser(
  username: string,
  excludePassword: boolean = true,
) {
  return await prisma.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
      username: true,
      password: !excludePassword,
    },
  });
}
