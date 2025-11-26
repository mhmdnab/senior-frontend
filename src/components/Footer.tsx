import Link from "next/link";
import Image from "next/image";

import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa"; // Example icons

const Footer = () => {
  return (
    <footer className="bg-[#100c14] py-10 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6">
        {/* Top Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div>
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

          {/* Social Icons */}
          <div className="flex items-center gap-5 text-slate-300">
            <Link href="https://facebook.com" target="_blank">
              <FaFacebook className="h-6 w-6 hover:text-[#cb6ce6] transition" />
            </Link>
            <Link href="https://twitter.com" target="_blank">
              <FaTwitter className="h-6 w-6 hover:text-[#cb6ce6] transition" />
            </Link>
            <Link href="https://instagram.com" target="_blank">
              <FaInstagram className="h-6 w-6 hover:text-[#cb6ce6] transition" />
            </Link>
            <Link href="https://linkedin.com" target="_blank">
              <FaLinkedin className="h-6 w-6 hover:text-[#cb6ce6] transition" />
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-6"></div>

        {/* Bottom Row */}
        <div className="text-center text-slate-400 text-sm">
          © {new Date().getFullYear()}{" "}
          <span className="text-[#cb6ce6] font-semibold">Dakesh</span>. All
          Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
