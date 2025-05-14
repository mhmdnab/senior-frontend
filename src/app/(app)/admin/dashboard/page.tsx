import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="h-screen flex items-center justify-center text-center m-auto">
      <div>
        <h1 className="text-3xl font-semibold mb-4">Welcome, Admin</h1>
        <p className="mb-6 text-lg">
          Manage users, products, and site settings from here.
        </p>

        <div className="flex gap-6 justify-center">
          <Link href="/admin/users">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg transform transition-transform duration-300 hover:bg-blue-700 hover:scale-105 hover:shadow-xl">
              Manage Users
            </button>
          </Link>
          <Link href="/admin/products">
            <button className="bg-green-600 text-white px-8 py-3 rounded-lg transform transition-transform duration-300 hover:bg-green-700 hover:scale-105 hover:shadow-xl">
              Manage Products
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
