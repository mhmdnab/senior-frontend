// app/admin/layout.tsx (or pages/admin/_layout.tsx if using pages)
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
        <nav className="flex flex-col gap-2">
          <Link href="/admin/dashboard">Dashboard</Link>
          <Link href="/admin/users">Users</Link>
          <Link href="/admin/products">Products</Link>
        </nav>
      </aside>
      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}
