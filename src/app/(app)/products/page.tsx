import React from "react";
import Link from "next/link";
import Image from "next/image";

const image =
  "https://i.pinimg.com/736x/2b/9c/3e/2b9c3ea1b8836b27e8fdcb2fe811243f.jpg";
const products = [
  {
    id: 1,
    name: "Product 1",
    description: "A short description of product 1.",
    imageUrl: image,
    link: "/products/1",
  },
  {
    id: 2,
    name: "Product 2",
    description: "A short description of product 2.",
    imageUrl: image,
    link: "/products/2",
  },
  {
    id: 3,
    name: "Product 3",
    description: "A short description of product 3.",
    imageUrl: image,
    link: "/products/3",
  },
  {
    id: 4,
    name: "Product 4",
    description: "A short description of product 4.",
    imageUrl: image,
    link: "/products/4",
  },
  {
    id: 5,
    name: "Product 5",
    description: "A short description of product 5.",
    imageUrl: image,
    link: "/products/5",
  },
  {
    id: 6,
    name: "Product 6",
    description: "A short description of product 6.",
    imageUrl: image,
    link: "/products/6",
  },
];

const ProductsPage = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-12 text-center">
          Our Products
        </h1>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {products.map((product) => (
            <Link href={product.link} key={product.id} className="block">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
                <div className="relative w-full h-48">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    objectFit="cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    {product.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
