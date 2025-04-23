import Link from "next/link";
import Image from "next/image";

import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa"; // Example icons

const Footer = () => {
  return (
    <footer className="bg-[#232323] py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Logo (Left on Desktop) */}
          <div className="mb-4 md:mb-0">
            <Link legacyBehavior href="/">
              <Image
                src={"/assets/logo.png"}
                alt="Your Logo"
                width={60}
                height={20}
                className="object-contain"
              />
            </Link>
          </div>

          {/* Social Media Icons (Right on Desktop) */}
          <div className="flex space-x-4 text-gray-400">
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="h-6 w-6 hover:text-white transition duration-300" />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="h-6 w-6 hover:text-white transition duration-300" />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="h-6 w-6 hover:text-white transition duration-300" />
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="h-6 w-6 hover:text-white transition duration-300" />
            </Link>
            {/* Add more social media icons as needed */}
          </div>
        </div>
        {/* Optional: Add copyright information */}
        <div className="mt-4 text-center text-gray-500 text-sm">Dakesh</div>
      </div>
    </footer>
  );
};

export default Footer;
