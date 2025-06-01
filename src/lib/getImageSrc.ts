// src/lib/getImageSrc.ts

export function getImageSrc(relPath: string): string {
  // If relPath is already a fully qualified URL, just return it:
  if (!relPath) return "/placeholder.svg";
  if (/^https?:\/\//.test(relPath)) {
    return relPath;
  }

  // Otherwise, ensure it has a leading "/" and prefix with your API_BASE:
  const clean = relPath.startsWith("/") ? relPath : `/${relPath}`;
  const base =
    process.env.NEXT_PUBLIC_API_BASE || "https://dakesh-backend.onrender.com";
  return `${base}${clean}`;
}
