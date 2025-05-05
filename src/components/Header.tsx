"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Toggle true/false to test

  return (
    <header className="flex flex-col md:flex-row items-center border-b-2 border-white justify-between p-5 bg-[#232323] shadow-md sticky">
      {/* Logo */}
      <div className="flex justify-center md:justify-start mb-4 md:mb-0">
        <Link href="/">
          <Image
            src={"/assets/logo.png"}
            alt="Your Logo"
            width={60}
            height={20}
            className="object-contain"
          />
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-row items-center space-x-4 md:space-x-6">
        <Link
          href="/contact"
          className="text-[#cb6ce6] hover:text-[#89499b] text-sm md:text-base"
        >
          Contact Us
        </Link>

        {isAuthenticated ? (
          <Link
            href="/profile"
            className="text-[#cb6ce6] hover:text-[#89499b] text-sm md:text-base"
          >
            Profile
          </Link>
        ) : (
          <>
            <Link
              href="/login"
              className="text-[#cb6ce6] hover:text-[#89499b] text-sm md:text-base"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="text-[#cb6ce6] hover:text-[#89499b] text-sm md:text-base"
            >
              Register
            </Link>
          </>
        )}

        <Link
          href="/products"
          className="px-4 py-2 text-white bg-[#cb6ce6] rounded-lg hover:bg-[#89499b] transition duration-300 text-sm md:text-base"
        >
          Dakesh Now
        </Link>
      </nav>
    </header>
  );
};

export default Header;
