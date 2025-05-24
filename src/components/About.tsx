import React from "react";
import Link from "next/link";

const AboutSection = () => {
  return (
    <section className="relative bg-[#f9f9f9] py-12 px-4 md:px-8 lg:px-16 min-h-screen overflow-hidden">
      {/* Animated Background Shapes */}
      <div className="absolute top-10 left-[-50px] w-64 h-64 bg-[#cb6ce6] opacity-20 rounded-full blur-3xl animate-pulse-slow z-0"></div>
      <div className="absolute bottom-0 right-[-60px] w-80 h-80 bg-[#89499b] opacity-10 rounded-full blur-3xl animate-float z-0"></div>
      <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-[#cb6ce6] opacity-10 rounded-full blur-2xl animate-float-delay z-0"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#89499b] mb-6">
          What is Dakesh?
        </h2>
        <p className="text-lg md:text-xl text-[#232323] font-semibold mb-8">
          Trade it, Don’t waste it.
        </p>
        <p className="text-base md:text-lg text-[#232323] leading-relaxed">
          Welcome to Dakesh, the ultimate destination for seamless and rewarding
          bartering! We believe in the power of trade to bring people together,
          foster community, and unlock value in items you no longer need. Our
          platform is designed to make bartering simple, secure, and fun,
          connecting like-minded individuals who want to exchange goods and
          services without the hassle of traditional buying and selling. Whether
          you’re decluttering your home, searching for something unique, or
          looking to give pre-loved items a new life, we’re here to help you
          trade smarter and sustainably. Join us in redefining how we exchange
          value – because sometimes, the best things in life aren’t bought,
          they’re traded!
        </p>
        <p className="text-base md:text-lg text-[#232323] leading-relaxed mt-4">
          <Link href="/register">
            <button className="bg-transparent border border-[#89499b] text-[#89499b] hover:bg-[#89499b] hover:text-white px-4 py-2 rounded-md transition duration-300">
              Register Here
            </button>
          </Link>
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
