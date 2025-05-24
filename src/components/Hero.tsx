import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative h-screen flex bg-[#232323] text-white">
      {/* Background Image (Optional) */}
      <div className="absolute inset-0">
        <Image
          src={"/assets/herobg.png"}
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="opacity-90"
        />
      </div>

      {/* Hero Content */}
      <div className="relative h-full flex items-center pl-24">
        {" "}
        {/* Adjusted for left alignment and vertical centering */}
        <div className="md:text-left text-center">
          {" "}
          {/* Align text to the left */}
          <h1 className="text-5xl font-bold mb-4">Dakesh</h1>
          <p className="text-xl mb-8">Trade it, Don’t waste it</p>
          <Link legacyBehavior href="/products">
            <a className="px-8 py-3 bg-[#cb6ce6] text-white rounded-lg text-lg font-semibold hover:bg-[#89499b] transition duration-300">
              Dakesh Now
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
