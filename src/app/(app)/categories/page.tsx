import React from "react";
import Link from "next/link";

const Categories = () => {
  // Example category data (replace with your actual data)
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
      link: "/categories/automobiles",
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 px-4 sm:px-0 py-12 items-stretch">
          {categories.map((category) => (
            <Link
              href={category.link}
              key={category.name}
              className="block h-full"
            >
              <div className="flex flex-col h-full bg-white rounded-lg shadow-xl hover:shadow-[#9c60ad] overflow-hidden transition duration-300">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 flex-1 flex flex-col justify-between">
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
