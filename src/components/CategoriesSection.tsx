// components/CategoriesSection.tsx
import React from "react";
import Link from "next/link";

const CategoriesSection = () => {
  const categories = [
    {
      name: "Electronics",
      description: "Explore the latest gadgets and electronic devices.",
      imageUrl:
        "https://i.pinimg.com/736x/44/d2/ad/44d2add5a8454d1eb4d7fed3015abcd8.jpg",
      link: "/categories/electronics",
    },
    {
      name: "Clothing",
      description: "Discover stylish clothing for every occasion.",
      imageUrl:
        "https://i.pinimg.com/736x/3d/4d/33/3d4d33650996dc8ff6e0503093627bf0.jpg",
      link: "/categories/clothing",
    },
    {
      name: "Home & Kitchen",
      description: "Find everything you need for your home and kitchen.",
      imageUrl:
        "https://i.pinimg.com/736x/56/f7/15/56f715fb5e0233a4985911be387bb89b.jpg",
      link: "/categories/home-kitchen",
    },
    {
      name: "Books",
      description: "Dive into a world of stories and knowledge.",
      imageUrl:
        "https://i.pinimg.com/736x/47/f6/1b/47f61b4b21f5e3b6fd6d06262100cf78.jpg",
      link: "/categories/books",
    },
    // Add more categories as needed
  ];

  return (
    <div className="min-h-screen bg-[#232323] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center">
        {/* Main Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-[#cb6ce6] mb-6 sm:mb-8">
          Dakesh by categories
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-[#89499b] mb-6 sm:mb-8">
          Browse our wide selection of products organized by category to easily
          find what you’re looking for.
        </p>

        {/* Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 py-8">
          {categories.map((category) => (
            <Link
              href={category.link}
              key={category.name}
              className="block h-full"
            >
              <div className="flex flex-col h-full bg-gradient-to-br from-[#1f1f1f] to-[#2a2a2a] rounded-xl shadow-md hover:shadow-[#cb6ce6]/50 hover:shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-full h-40 sm:h-48 object-cover"
                />
                <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-1">
                    {category.name}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    {category.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View More Button */}
        <div className="mt-6 sm:mt-8">
          <Link href="/categories">
            <button
              type="button"
              className="bg-purple-600 hover:bg-purple-500 text-white font-semibold py-2 px-4 sm:py-3 sm:px-6 rounded-xl shadow-md transition duration-300 text-sm sm:text-base"
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
