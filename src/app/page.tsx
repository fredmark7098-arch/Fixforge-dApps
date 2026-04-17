import { Metadata } from "next";
import Banner from "./components/home/hero";
import Companies from "./components/home/companies";
import MaxirchainLandingSections from "./components/home/landing-maxirchain";
import Work from "./components/home/work";
import Table from "./components/home/table";
import Features from "./components/home/features";
import Simple from "./components/home/simple";
import Trade from "./components/home/trade";
import ContactForm from "./components/ContactForm";

export const metadata: Metadata = {
  title: { absolute: "Fixforge-dApps" },
};

export default function Home() {
  return (
    <main className="min-w-0 pt-20 sm:pt-24 lg:pt-24">
      <Banner/>
      <Companies />

      <MaxirchainLandingSections />
      <Work />
      <Table />
      <Features />
      <Simple />
      <Trade />
      <ContactForm />
    </main>
  );
}
