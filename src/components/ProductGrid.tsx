// components/ProductGrid.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { getImageSrc } from "@/lib/getImageSrc";

interface Product {
  _id: number;
  title: string;
  description: string;
  images: string[];
  link: string;
}

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://dakesh-backend.onrender.com";

const ProductGrid = () => {
  const [userProducts, setUserProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${API_BASE}/api/products/`);
        setUserProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <section className="relative bg-[#141018] py-20 px-4 sm:px-6 lg:px-10 overflow-hidden">
        <div className="absolute inset-0 opacity-80 bg-[radial-gradient(circle_at_10%_20%,rgba(203,108,230,0.16),transparent_28%),radial-gradient(circle_at_80%_0,rgba(137,73,155,0.16),transparent_26%)]" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-[#f7d7ff]/80">
                Marketplace
              </p>
              <h2 className="text-4xl font-semibold text-white mt-2">
                Discovering fresh swaps...
              </h2>
            </div>
            <div className="h-10 rounded-full px-4 flex items-center gap-2 bg-white/5 border border-white/10 text-sm text-slate-200">
              <span className="h-2 w-2 rounded-full bg-[#cb6ce6] animate-pulse" />
              Syncing the latest listings
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div
                key={idx}
                className="animate-pulse bg-white/5 border border-white/10 rounded-2xl h-[340px] overflow-hidden"
              >
                <div className="h-[60%] bg-white/10" />
                <div className="p-4 space-y-2">
                  <div className="h-4 w-2/3 bg-white/10 rounded" />
                  <div className="h-3 w-full bg-white/10 rounded" />
                  <div className="h-3 w-5/6 bg-white/10 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-[#141018] py-20 px-4 sm:px-6 lg:px-10 min-h-screen overflow-hidden">
      <div className="absolute inset-0 opacity-80 bg-[radial-gradient(circle_at_15%_20%,rgba(203,108,230,0.16),transparent_28%),radial-gradient(circle_at_80%_0,rgba(137,73,155,0.16),transparent_26%),radial-gradient(circle_at_60%_80%,rgba(255,255,255,0.08),transparent_32%)]" />
      <div className="absolute -bottom-32 -right-20 w-80 h-80 bg-[#cb6ce6]/15 blur-3xl rounded-full" />
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#f7d7ff]/80">
              Curated matches
            </p>
            <h2 className="text-4xl sm:text-5xl font-semibold text-white mt-2 leading-tight">
              Swap what you have for what you need
            </h2>
            <p className="mt-3 text-lg text-slate-200/85 max-w-2xl">
              Fresh listings from the Dakesh community. Pick a card to view
              details, make an offer, or save it to your wishlist.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#cb6ce6] shadow-[0_0_0_6px_rgba(203,108,230,0.2)]" />
            <p className="text-sm text-slate-200/90">
              {userProducts.length} active swaps right now
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {userProducts.slice(0, 8).map((product) => {
            const key = `product-${product._id}`;
            const productLink = `/products/${product._id}`;

            return (
              <Link href={productLink} key={key} className="group block">
                <article className="relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-[0_15px_40px_-20px_rgba(203,108,230,0.45)] transition-transform duration-300 group-hover:-translate-y-1">
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={getImageSrc(product.images?.[0])}
                      alt={product.title}
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 via-slate-900/0 to-slate-900/50" />
                    <div className="absolute top-4 left-4 flex items-center gap-2 text-xs font-semibold text-slate-900">
                      <span className="rounded-full bg-[#f7d7ff] px-3 py-1 shadow-md shadow-[#cb6ce6]/20">
                        New
                      </span>
                      <span className="rounded-full bg-white/80 px-3 py-1">
                        {product.images?.length || 1} photos
                      </span>
                    </div>
                  </div>

                    <div className="p-5 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-lg font-semibold text-white line-clamp-1">
                          {product.title}
                        </h3>
                        <span className="text-[11px] uppercase tracking-wide text-[#f7d7ff]/90 bg-[#cb6ce6]/10 px-2 py-1 rounded-full border border-[#cb6ce6]/20">
                          Swap
                        </span>
                      </div>
                      <p className="text-sm text-slate-200/80 line-clamp-2">
                        {product.description}
                    </p>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-slate-300/80">
                        Tap to view details
                      </span>
                      <span className="text-sm font-semibold text-emerald-200 group-hover:text-emerald-100">
                        View →
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>

        <div className="mt-14 flex justify-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#cb6ce6] via-[#b36ce0] to-[#89499b] text-slate-950 font-semibold px-6 py-3 shadow-lg shadow-[#cb6ce6]/25 hover:translate-y-[-1px] hover:shadow-[#cb6ce6]/30 transition"
          >
            Browse the marketplace
            <span className="text-base">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
