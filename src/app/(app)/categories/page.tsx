import React from "react";
import Link from "next/link";

const Categories = () => {
  // Example category data (replace with your actual data)
  const categories = [
    {
      name: "Electronics",
      description: "Explore the latest gadgets and electronic devices.",
      imageUrl:
        "https://via.placeholder.com/300/007bff/FFFFFF?Text=Electronics", // Placeholder image URL
      link: "/categories/electronics",
    },
    {
      name: "Clothing",
      description: "Discover stylish clothing for every occasion.",
      imageUrl: "https://via.placeholder.com/300/28a745/FFFFFF?Text=Clothing", // Placeholder image URL
      link: "/categories/clothing",
    },
    {
      name: "Books",
      description: "Dive into a world of stories and knowledge.",
      imageUrl: "https://via.placeholder.com/300/ffc107/000000?Text=Books", // Placeholder image URL
      link: "/categories/books",
    },
    {
      name: "Toys",
      description:
        "A wide variety of fun and educational toys for children of all ages.",
      imageUrl: "https://via.placeholder.com/300/ffc107/000000?Text=Books", // Placeholder image URL
      link: "/categories/toys",
    },
    {
      name: "Other",
      description:
        "Miscellaneous items that don’t fit into specific categories, but are still worth exploring.",
      imageUrl: "https://via.placeholder.com/300/ffc107/000000?Text=Books", // Placeholder image URL
      link: "/categories/other",
    },
    // Add more categories as needed
  ];

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#522c5d] to-[#232323] py-16 px-5 md:px-12">
      <div className="container mx-auto text-center">
        {/* Main Title */}
        <h1 className="text-4xl font-bold text-[#cb6ce6] mb-8">
          Dakesh by categories
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-[#89499b] mb-8">
          Browse our wide selection of products organized by category to easily
          find what you're looking for to trade.
        </p>

        {/* Category Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 px-4 sm:px-0 py-12">
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
        </div>
      </div>
    </div>
  );
};

export default Categories;
