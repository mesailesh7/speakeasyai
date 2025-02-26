import Image from "next/image";
import { Button } from "@/components/ui/button";
import Banner from "@/components/home/banner";

export default function Home() {
  return (
    <main className="mx-auto w-full inset-0 h-full bg-[radial-gradient(#e5e7eb_1px), transparent_1px]">
      <Banner />
      {/* <Divider />
      <HowItWorks />
      <Divider />
      <Pricing />
      <Divider />
      <Footer /> */}
    </main>
  );
}
