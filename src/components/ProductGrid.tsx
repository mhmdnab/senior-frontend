import React from "react";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  link: string;
}

const ProductGrid = () => {
  // Example product data (replace with your actual data)
  const products: Product[] = [
    {
      id: 1,
      name: "Vintage Camera",
      description: "Capture memories with this classic vintage camera.",
      imageUrl: "https://placehold.co/300x300", // Placeholder image URL
      link: "/products/vintage-camera",
    },
    {
      id: 2,
      name: "Cozy Knit Sweater",
      description: "Stay warm and stylish in this comfortable knit sweater.",
      imageUrl: "https://placehold.co/300x300", // Placeholder image URL
      link: "/products/cozy-sweater",
    },
    {
      id: 3,
      name: "Leather Backpack",
      description:
        "Carry your essentials in this durable and stylish leather backpack.",
      imageUrl: "https://placehold.co/300x300", // Placeholder image URL
      link: "/products/leather-backpack",
    },
    {
      id: 4,
      name: "Handmade Pottery Mug",
      description:
        "Enjoy your favorite beverage in this unique handmade pottery mug.",
      imageUrl: "https://placehold.co/300x300", // Placeholder image URL
      link: "/products/pottery-mug",
    },
    // Add more products as needed
  ];

  return (
    <div className="bg-white py-12 min-h-screen mt-12">
      <div className="container mx-auto text-center">
        {/* Header Text */}
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Swap What You Have for What You Need!
        </h2>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 sm:px-0 py-12">
          {products.map((product) => (
            <Link href={product.link} key={product.id} className="block">
              <div className="bg-gray-100 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{product.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {/* View More Button */}
        <div className="mt-8">
          <Link href="/products">
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

export default ProductGrid;
