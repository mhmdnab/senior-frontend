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
    <div className="min-h-screen bg-gradient-to-b from-[#232323] to-[#1a1a1a] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center">
        {/* Main Title */}
        <h1 className="text-4xl font-extrabold text-[#cb6ce6] mb-4 tracking-wide drop-shadow">
          Dakesh by Categories
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-[#c59cd9] max-w-2xl mx-auto mb-10 leading-relaxed">
          Browse our collection of products organized by category so you can
          find exactly what you're looking for — fast, simple, and beautifully
          structured.
        </p>

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
              group-hover:shadow-purple-700/40 group-hover:shadow-xl
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
                  <p className="text-gray-300 text-sm leading-relaxed">
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
            bg-gradient-to-r from-purple-600 to-[#cb6ce6]
            hover:from-purple-500 hover:to-[#b858d4]
            text-white font-semibold py-3 px-8 rounded-xl
            shadow-lg shadow-purple-800/30 transition-all duration-300
          "
            >
              View More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoriesSection;
