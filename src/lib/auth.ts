export function verifyAuth(authHeader: string | null): boolean {
  if (!authHeader?.startsWith("Bearer ")) return false;
  const token = authHeader.slice(7);
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    return decoded === process.env.ADMIN_PASSWORD;
  } catch {
    return false;
  }
}
