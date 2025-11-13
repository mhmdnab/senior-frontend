"use client";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const { isLoggedIn } = useAuth();

  return (
    <header
      className="flex flex-col md:flex-row items-center justify-between 
  px-4 py-3 bg-[#232323] border-b border-[#3a3a3a] shadow-md sticky top-0 z-50"
    >
      {/* Logo */}
      <div className="flex justify-center md:justify-start mb-3 md:mb-0">
        <Link href="/">
          <Image
            src="/assets/logo.png"
            width={70}
            height={30}
            alt="Logo"
            className="object-contain hover:opacity-90 transition"
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex flex-row items-center gap-4 md:gap-6">
        {/* Contact Us — Always visible */}
        <Link
          href="/contact"
          className="text-[#cb6ce6] hover:text-[#e6c1f2] transition text-sm md:text-base font-medium"
        >
          Contact Us
        </Link>

        {/* Conditional Links */}
        {isLoggedIn ? (
          <>
            <Link
              href="/profile"
              className="text-[#cb6ce6] hover:text-[#e6c1f2] transition text-sm md:text-base font-medium"
            >
              Profile
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="text-[#cb6ce6] hover:text-[#e6c1f2] transition text-sm md:text-base font-medium"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="text-[#cb6ce6] hover:text-[#e6c1f2] transition text-sm md:text-base font-medium"
            >
              Register
            </Link>
          </>
        )}

        {/* CTA Button */}
        <Link href="/products">
          <button
            className="
          px-4 py-2 rounded-lg text-white text-sm md:text-base font-semibold
          bg-gradient-to-r from-purple-600 to-pink-600
          hover:from-purple-500 hover:to-pink-500
          shadow-md hover:shadow-purple-900/40
          transition-all duration-300
        "
          >
            Dakesh Now
          </button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
