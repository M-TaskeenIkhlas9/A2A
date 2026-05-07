import {
  Hero,
  Categories,
  BrandStatement,
  NewArrivals,
  Campaign,
  BestSellers,
  Newsletter,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <BrandStatement />
      <NewArrivals />
      <Campaign />
      <BestSellers />
      <Newsletter />
    </>
  );
}
