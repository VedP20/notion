import Image from "next/image";
import { Button } from "@/components/ui/button";
import Heading from "./-components/heading";
import Heroes from "./-components/heroes";
import Footer from "./-components/footer";

const MarketingPage = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col justify-center items-center md:justify-start text-center gap-y-4 px-6 mb-10 h-full">
        <Heading />
        <Heroes />
      </div>
      <Footer />
    </div>
  );
};

export default MarketingPage;
