import Hero from "../Compmonents/home/Hero";
import Categories from "../Compmonents/home/Categories";
import Features from "../Compmonents/home/Features";
import FeaturedProducts from "../Compmonents/home/FeaturedProducts";
import PromotionalBanners from "../Compmonents/home/PromotionalBanners";
import BestSellers from "../Compmonents/home/BestSellers";

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <Features />
      <FeaturedProducts />
      <PromotionalBanners />
      <BestSellers />
    </>
  );
}
