import { redirect } from "next/navigation";
import AboutSection from "../components/About";
import CategoriesSection from "../components/CategoriesSection";
import Hero from "../components/Hero";
import ProductGrid from "../components/ProductGrid";

export default function Home() {
  redirect("/login");
  return (
    <div>
      <Hero />
      <AboutSection />
      <CategoriesSection />
      <ProductGrid />
    </div>
  );
}
