import React from "react";

const AboutSection = () => {
  return (
    <section className="bg-[#f9f9f9] py-12 px-4 md:px-8 lg:px-16 min-h-screen">
      <div className="max-w-4xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#89499b] mb-6">
          What is Dakesh?
        </h2>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-[#232323] font-semibold mb-8">
          Trade it, Don’t waste it.
        </p>

        {/* Description */}
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
        <p className="text-base md:text-lg text-[#232323] hover:text-[#89499b] leading-relaxed mt-4">
          <a href="/register" className="underline">
            Register Here
          </a>
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
