import React from "react";
import Link from "next/link";

const CategoriesSection = () => {
  // Example category data (replace with your actual data)
  const categories = [
    {
      name: "Electronics",
      description: "Explore the latest gadgets and electronic devices.",
      imageUrl: "https://placehold.co/300x300", // Placeholder image URL
      link: "/categories/electronics",
    },
    {
      name: "Clothing",
      description: "Discover stylish clothing for every occasion.",
      imageUrl: "https://placehold.co/300x300", // Placeholder image URL
      link: "/categories/clothing",
    },
    {
      name: "Home & Kitchen",
      description: "Find everything you need for your home and kitchen.",
      imageUrl: "https://placehold.co/300x300", // Placeholder image URL
      link: "/categories/home-kitchen",
    },
    {
      name: "Books",
      description: "Dive into a world of stories and knowledge.",
      imageUrl: "https://placehold.co/300x300", // Placeholder image URL
      link: "/categories/books",
    },
    // Add more categories as needed
  ];

  return (
    <div className="min-h-screen bg-[#232323] py-16 mt-8">
      <div className="container mx-auto text-center">
        {/* Main Title */}
        <h1 className="text-4xl font-bold text-[#cb6ce6] mb-8">
          Dakesh by categories
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-[#89499b] mb-8">
          Browse our wide selection of products organized by category to easily
          find what you're looking for.
        </p>

        {/* Category Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 sm:px-0 py-12">
          {categories.map((category) => (
            <Link href={category.link} key={category.name} className="block">
              <div className="bg-white rounded-lg shadow-md hover:shadow-[#cb6ce6] overflow-hidden hover:shadow-2xl transition duration-300">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {category.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
          {/* View More Button */}
        </div>
        <div className="mt-8">
          <Link href="/categories">
            <button
              type="submit"
              className="w-auto bg-[#cb6ce6] hover:bg-[#89499b] text-white py-2 px-4 rounded-md transition duration-300"
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
