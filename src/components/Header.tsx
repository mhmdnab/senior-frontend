"use client";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const { isLoggedIn } = useAuth();

  return (
    <header className="flex flex-col md:flex-row items-center border-b-2 border-white justify-between px-4 py-2 bg-[#232323] shadow-md sticky">
      {/* Logo */}
      <div className="flex justify-center md:justify-start mb-4 md:mb-0">
        <Link href="/">
          <Image
            src="/assets/logo.png"
            width={60}
            height={20}
            style={{ width: "100%", height: "auto" }}
            className="object-contain"
            alt="Logo"
          />
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-row items-center space-x-4 md:space-x-6">
        {isLoggedIn ? (
          <>
            <Link
              href="/contact"
              className="text-[#cb6ce6] hover:text-[#89499b] text-sm md:text-base"
            >
              Contact Us
            </Link>
            <Link
              href="/profile"
              className="text-[#cb6ce6] hover:text-[#89499b] text-sm md:text-base"
            >
              Profile
            </Link>
          </>
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
