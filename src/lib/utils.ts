import bcrypt from "bcrypt";

const saltRounds = 10;

export async function hashPassword(plainPass: string): Promise<string> {
  try {
    const hashedPassword = await bcrypt.hash(plainPass, saltRounds);
    return hashedPassword;
  } catch (e) {
    console.log("Error hashing password -> ", e);
    throw e;
  }
}

export async function comparePasswords(
  entry: string,
  real: string,
): Promise<boolean> {
  try {
    const comparedPasswords = await bcrypt.compare(entry, real);
    return comparedPasswords;
  } catch (e) {
    console.log("Error comparing password ->", e);
    throw e;
  }
}
