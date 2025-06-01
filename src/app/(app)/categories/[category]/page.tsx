// src/app/(app)/categories/[category]/page.tsx

import { getImageSrc } from "@/lib/getImageSrc";
import Image from "next/image";
import Link from "next/link";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://dakesh-backend.onrender.com";

export default async function Page({ params }: any) {
  // fetch your products server‐side
  const res = await fetch(
    `${API_BASE}/api/products?category=${encodeURIComponent(params.category)}`,
    { cache: "no-store" }
  );
  const products = await res.json();

  return (
    <div className="p-8 bg-gradient-to-tr from-[#522c5d] to-[#232323] min-h-screen">
      <h1 className="text-2xl font-bold capitalize mb-6 text-white">
        {params.category} Products
      </h1>

      {products.length === 0 ? (
        <p className="text-white">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <Link
              key={product._id}
              href={`/products/${product._id}`}
              className="block"
            >
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src={getImageSrc(product.images[0])}
                    alt={product.title}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{product.title}</h2>
                  <p className="text-sm text-gray-500">
                    By {product.owner?.username || "Unknown"}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
