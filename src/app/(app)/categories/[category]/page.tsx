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
      <h1 className="text-3xl font-extrabold capitalize mb-8 text-[#cb6ce6] drop-shadow">
        {params.category} Products
      </h1>

      {products.length === 0 ? (
        <p className="text-purple-200 text-lg">
          No products found in this category.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product: any) => (
            <Link
              key={product._id}
              href={`/products/${product._id}`}
              className="block group"
            >
              <div
                className="
              bg-white/10 backdrop-blur-lg 
              border border-white/10 rounded-2xl 
              overflow-hidden shadow-lg
              transition-all duration-300
              group-hover:shadow-purple-700/40
              group-hover:-translate-y-2
            "
              >
                {/* Image */}
                <div className="relative h-52 w-full overflow-hidden">
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="
                  transition-transform duration-500
                  group-hover:scale-110
                "
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  <h2 className="text-xl font-semibold text-white mb-1">
                    {product.title}
                  </h2>
                  <p className="text-sm text-purple-200">
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
