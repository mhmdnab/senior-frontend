// components/CategoriesSection.tsx
import React from "react";
import Link from "next/link";

const CategoriesSection = () => {
  const categories = [
    {
      name: "Electronics",
      description: "Explore the latest gadgets and electronic devices.",
      imageUrl:
        "https://i.pinimg.com/736x/44/d2/ad/44d2add5a8454d1eb4d7fed3015abcd8.jpg", // Placeholder image URL
      link: "/categories/electronics",
    },
    {
      name: "Clothing",
      description: "Discover stylish clothing for every occasion.",
      imageUrl:
        "https://i.pinimg.com/736x/3d/4d/33/3d4d33650996dc8ff6e0503093627bf0.jpg", // Placeholder image URL
      link: "/categories/clothing",
    },
    {
      name: "Books",
      description: "Dive into a world of stories and knowledge.",
      imageUrl:
        "https://i.pinimg.com/736x/56/f7/15/56f715fb5e0233a4985911be387bb89b.jpg", // Placeholder image URL
      link: "/categories/books",
    },
    {
      name: "Toys",
      description:
        "A wide variety of fun and educational toys for children of all ages.",
      imageUrl:
        "https://i.pinimg.com/736x/7b/05/fa/7b05fab78047f0491935e3efcf654776.jpg", // Placeholder image URL
      link: "/categories/toys",
    },
    {
      name: "Automobiles",
      description:
        "The Automobiles category includes motorized vehicles like cars, motorcycles, trucks, and vans for barter.",
      imageUrl:
        "https://i.pinimg.com/736x/3c/11/5f/3c115f879d68db7ac8e32c0f4196e071.jpg", // Placeholder image URL
      link: "/categories/other",
    },
    {
      name: "Other",
      description:
        "Miscellaneous items that don’t fit into specific categories, but are still worth exploring.",
      imageUrl:
        "https://i.pinimg.com/736x/7c/72/4b/7c724b52594be48660e723177efcb637.jpg", // Placeholder image URL
      link: "/categories/other",
    },

    // Add more categories as needed
  ];

  return (
    <div className="min-h-screen bg-[#141018] py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-80 bg-[radial-gradient(circle_at_20%_20%,rgba(203,108,230,0.18),transparent_30%),radial-gradient(circle_at_80%_0,rgba(137,73,155,0.18),transparent_28%),radial-gradient(circle_at_60%_80%,rgba(255,255,255,0.05),transparent_32%)]" />
      <div className="absolute -bottom-28 -right-24 w-72 h-72 bg-[#cb6ce6]/15 blur-3xl rounded-full" />
      <div className="absolute -top-24 -left-16 w-64 h-64 bg-[#89499b]/15 blur-3xl rounded-full" />
      <div className="relative z-10">
      <div className="max-w-5xl mx-auto text-center">
        {/* Main Title */}
        <div className="flex flex-col gap-3 items-center">
          <p className="text-sm uppercase tracking-[0.35em] text-[#f7d7ff]/80">
            Categories
          </p>
          <h1 className="text-4xl font-extrabold text-white tracking-wide drop-shadow">
            Dakesh by Categories
          </h1>
          <p className="text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Browse collections so you can find exactly what you're looking for —
            fast, simple, and beautifully structured.
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-10">
          {categories.slice(0, 4).map((category) => (
            <Link
              href={category.link}
              key={category.name}
              className="block group"
            >
              <div
                className="
              bg-white/5 backdrop-blur-xl 
              border border-white/10 
              rounded-2xl overflow-hidden shadow-md
              transition-all duration-300
              group-hover:shadow-[#cb6ce6]/40 group-hover:shadow-xl
              group-hover:-translate-y-2
            "
              >
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="
                w-full h-40 sm:h-48 object-cover 
                transition-transform duration-500 
                group-hover:scale-105
              "
                />

                <div className="p-5 text-center">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {category.name}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View More Button */}
        <div className="mt-8">
          <Link href="/categories">
            <button
            type="button"
            className="
            bg-gradient-to-r from-[#cb6ce6] via-[#b36ce0] to-[#89499b]
            hover:shadow-lg hover:shadow-[#cb6ce6]/35
            text-slate-950 font-semibold py-3 px-8 rounded-xl
            shadow-lg shadow-[#cb6ce6]/30 transition-all duration-300
          "
            >
              View More
            </button>
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
};

export default CategoriesSection;
