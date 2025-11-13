import React from "react";
import Link from "next/link";

const AboutSection = () => {
  return (
    <section className="relative bg-[#f9f9f9] min-h-screen flex items-center justify-center overflow-hidden px-6 py-20">
      {/* Animated Background Shapes */}
      <div className="absolute top-10 left-[-70px] w-72 h-72 bg-[#cb6ce6] opacity-25 rounded-full blur-3xl animate-pulse-slow pointer-events-none"></div>
      <div className="absolute bottom-[-40px] right-[-80px] w-96 h-96 bg-[#89499b] opacity-15 rounded-full blur-3xl animate-float pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/2 w-52 h-52 bg-[#cb6ce6] opacity-10 rounded-full blur-2xl animate-float-delay pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl w-full text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#89499b] mb-4 drop-shadow-sm">
          What is Dakesh?
        </h2>

        <p className="text-xl md:text-2xl text-[#444] font-semibold mb-8 tracking-wide">
          Trade it, Don’t waste it.
        </p>

        <p className="text-base md:text-lg text-[#333] leading-relaxed mb-10 px-2 md:px-6">
          Welcome to{" "}
          <span className="font-semibold text-[#89499b]">Dakesh</span>, the
          ultimate destination for seamless and rewarding bartering! We believe
          in the power of trade to bring people together, foster community, and
          unlock value in items you no longer need. Our platform makes bartering
          simple, secure, and fun — connecting like-minded individuals who want
          to exchange goods and services without the hassle of buying or
          selling.
          <br />
          <br />
          Whether you’re decluttering, searching for something unique, or giving
          pre-loved items a new life, Dakesh helps you trade smarter,
          sustainably, and with purpose. Join us in redefining how we exchange
          value — because sometimes, the best things in life aren’t bought,{" "}
          <span className="font-semibold text-[#89499b]">they’re traded</span>.
        </p>

        <Link href="/register">
          <button
            className="
        px-6 py-3 rounded-lg text-lg font-medium
        border border-[#89499b] text-[#89499b]
        hover:bg-[#89499b] hover:text-white
        transition-all duration-300 shadow-md hover:shadow-lg
      "
          >
            Register Here
          </button>
        </Link>
      </div>
    </section>
  );
};

export default AboutSection;
